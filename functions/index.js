const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const {Configuration, PlaidEnvironments, PlaidApi} = require("plaid");
const cors = require("cors")({origin: true});
require("dotenv").config();
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello Wadzoo user, you have found our API...");
});

/**
 * This function updates appInfo users count when user doc is created/deleted
 */

exports.addUsersCount = functions.firestore
    .document("users/{uid}")
    .onCreate((snap, context) => {
      admin
          .firestore()
          .doc("app/appInfo")
          .update({usersCount: admin.firestore.FieldValue.increment(1)})
          .then(() => {
            functions.logger.log("Added user, updated appInfo");
          })
          .catch((err) => {
            functions.logger.log("Error occured", err);
          });
    });

exports.deleteUsersCount = functions.firestore
    .document("users/{uid}")
    .onDelete((snap, context) => {
      admin
          .firestore()
          .doc("app/appInfo")
          .update({usersCount: admin.firestore.FieldValue.increment(-1)})
          .then(() => {
            functions.logger.log("Deleted user doc, updated appInfo");
          })
          .catch((err) => {
            functions.logger.log("Error occured", err);
          });
    });

exports.addListingsCount = functions.firestore
    .document("listings/{docID}")
    .onCreate((snap, context) => {
      admin
          .firestore()
          .doc("app/appInfo")
          .update({listingsCount: admin.firestore.FieldValue.increment(1)})
          .then(() => {
            functions.logger.log("Added listing, updated appInfo");
          })
          .catch((err) => {
            functions.logger.log("Error occured", err);
          });
    });

exports.deleteListingsCount = functions.firestore
    .document("listings/{docID}")
    .onDelete((snap, context) => {
      admin
          .firestore()
          .doc("app/appInfo")
          .update({listingsCount: admin.firestore.FieldValue.increment(-1)})
          .then(() => {
            functions.logger.log("Deleted listing doc, updated appInfo");
          })
          .catch((err) => {
            functions.logger.log("Error occured", err);
          });
    });

/**
 * This function will generate a link token for Plaid
 * to be exchanged for a public token -> access_token
 */

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});
const client = new PlaidApi(configuration);

exports.generateLinkToken = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    functions.logger.log("NEW PLAID REQUEST", request);
    if (request.method === "POST") {
      const clientUID = request.body.uid;
      const plaidRequest = {
        user: {
          client_user_id: clientUID,
        },
        client_name: "Wadzoo",
        products: ["auth"],
        language: "en",
        country_codes: ["US"],
      };
      client
          .linkTokenCreate(plaidRequest)
          .then((createTokenResponse) => {
            response.json(createTokenResponse.data);
          })
          .catch((err) => {
            functions.logger.log("ERROR", err);
            response.json(err);
          });
    }
  });
});

/**
 * This function receives an public token and exchanges
 * for an access token
 */

exports.getAccessToken = functions.https.onRequest((req, res) => {
  functions.logger.log("NEW ACCESS TOKEN REQUEST");
  cors(req, res, () => {
    if (req.method === "POST") {
      const publicToken = req.body.publicToken;
      const plaidRequest = {
        public_token: publicToken,
      };
      client
          .itemPublicTokenExchange(plaidRequest)
          .then((response) => {
            res.json(response.data);
          })
          .catch((err) => {
            functions.logger.log("ERROR", err);
            res.json(err);
          });
    }
  });
});

exports.getAccounts = functions.https.onRequest((req, res) => {
  functions.logger.log("NEW ACCOUNTS REQUEST");
  cors(req, res, () => {
    if (req.method === "POST") {
      const accessToken = req.body.accessToken;
      const plaidRequest = {
        access_token: accessToken,
      };
      client
          .accountsBalanceGet(plaidRequest)
          .then((response) => {
            res.json(response.data);
          })
          .catch((err) => {
            functions.logger.log("ERROR", err);
            res.json(err);
          });
    }
  });
});

/**
 * This function receives a webhook from IAPHUB,
 * it will send me a notification to my phone.
 * It will also log an event in Firebase Analytics
 */

exports.iaphubSubscriptionNoty = functions.https.onRequest(
    (request, response) => {
      functions.logger.log(
          "NEW IAPHUB REQUEST, METHOD:",
          request.method,
          request,
          "PLAID_ENV",
          process.env.PLAID_ENV
      );
      if (request.method === "POST") {
      // Update user's activeProducts if applicable
        if (request.body.type === "subscription_expire") {
          const uid = request.body.data.userId;
          admin
              .firestore()
              .doc(`users/${uid}`)
              .update({activeProducts: []})
              .then(() => {
                functions.logger.log(
                    `Updated activeProducts for user ${uid} to none`
                );
                // Update user's subscription if app is not quit
                admin
                    .firestore()
                    .doc(`users/${uid}`)
                    .get()
                    .then((userDoc) => {
                      const userData = userDoc.data();
                      if ("notificationToken" in userData) {
                        const payload = {
                          notification: {
                            title: "Subscription Expired",
                            body: "Your Wadzoo subscription just expired!",
                          },
                          data: {
                            type: "info",
                            action: "subscription_expire",
                          },
                        };
                        const token = userData.notificationToken.token;
                        admin
                            .messaging()
                            .sendToDevice(token, payload)
                            .then(() =>
                            // eslint-disable-next-line max-len
                              functions.logger.log(
                                  `Successfully sent ${uid} background message`
                              )
                            );
                      } else {
                        functions.logger.log(
                            `No notification token found uid ${uid}`
                        );
                      }
                    })
                    .catch((err) =>
                      functions.logger.log("Error expiring sub in-app")
                    );
              })
              .catch((err) =>
                functions.logger.log(
                    "Error updating activeProducts on expiration" + err
                )
              );
        } else if (request.body.type === "purchase") {
        // Update purchases
          admin
              .firestore()
              .doc("app/subscriptions")
              .update({
                totalRevenue: admin.firestore.FieldValue.increment(
                    request.body.data.price
                ),
                totalPurchases: admin.firestore.FieldValue.increment(1),
              })
              .then(() => functions.logger.log("Updated app/subscriptions"))
              .catch((err) =>
                functions.logger.log("Error updating app/subscriptions", err)
              );
          admin
              .firestore()
              .collection("app/subscriptions/purchases")
              .add(request.body.data)
              .catch((err) =>
                functions.logger.log("Error adding purchase to app/subs", err)
              );
          const uid = request.body.data.userId;
          // A user made a new purchase, check if it was with a promo code
          admin
              .firestore()
              .doc(`users/${uid}`)
              .get()
              .then((docSnapshot) => {
                const userData = docSnapshot.data();
                if ("promoCode" in userData) {
                  if (
                    userData.promoCode !== null &&
                typeof userData.promoCode === "string"
                  ) {
                    // User purchased with a promo code,
                    // add purchase under promoCodes
                    const promoCode = userData.promoCode;
                    admin
                        .firestore()
                        .collection("promoCodes")
                        .where("promoCode", "==", promoCode)
                        .get()
                        .then((promoDocsSnapshot) => {
                          if (!promoDocsSnapshot.empty) {
                            const promoDoc = promoDocsSnapshot.docs[0];
                            // Update doc with new purchase
                            promoDoc.ref
                                .collection("purchases")
                                .add(request.body.data)
                                .then(() =>
                                  functions.logger.log(
                                      "added purchase doc to promoCode"
                                  )
                                )
                                .catch((err) =>
                                  functions.logger.log(
                                      "Couldn't add new purchase doc",
                                      err
                                  )
                                );
                            // Update totalPurchases
                            if ("totalPurchases" in promoDoc.data()) {
                              promoDoc.ref
                                  .update({
                                    totalPurchases:
                              admin.firestore.FieldValue.increment(1),
                                    // eslint-disable-next-line max-len
                                    totalRevenue: admin.firestore.FieldValue.increment(
                                        request.body.data.price
                                    ),
                                  })
                                  .catch((err) =>
                                    functions.logger.log(
                                        "Error incrementing totalPurchases",
                                        err
                                    )
                                  );
                            } else {
                              promoDoc.ref
                                  .update({
                                    totalPurchases: 1,
                                    totalRevenue: request.body.data.price,
                                  })
                                  .catch((err) =>
                                    functions.logger.log(
                                        "Error incrementing totalPurchases",
                                        err
                                    )
                                  );
                            }
                          }
                        })
                        .catch((err) =>
                          functions.logger.log(
                              "Couldn't get doc with matching promoCode"
                          )
                        );
                  }
                }
              })
              .catch((err) =>
              // eslint-disable-next-line max-len
                functions.logger.log("Couldn't get user doc to see if promo used")
              );
        } else if (request.body.type === "subscription_renewal") {
        // Update purchases
          admin
              .firestore()
              .doc("app/subscriptions")
              .update({
                totalRevenue: admin.firestore.FieldValue.increment(
                    request.body.data.price
                ),
                totalPurchases: admin.firestore.FieldValue.increment(1),
              })
              .catch((err) =>
                functions.logger.log("Error updating app/subscriptions", err)
              );
          admin
              .firestore()
              .collection("app/subscriptions/renewals")
              .add(request.body.data)
              .catch((err) =>
                functions.logger.log("Error adding renewal to app/rens", err)
              );
          const uid = request.body.data.userId;
          // A user renewed, check if it was purchased with a promo
          admin
              .firestore()
              .doc(`users/${uid}`)
              .get()
              .then((docSnapshot) => {
                const userData = docSnapshot.data();
                if ("promoCode" in userData) {
                  if (
                    userData.promoCode !== null &&
                typeof userData.promoCode === "string"
                  ) {
                    // User purchased with a promo code,
                    // add renewal under promoCodes
                    const promoCode = userData.promoCode;
                    admin
                        .firestore()
                        .collection("promoCodes")
                        .where("promoCode", "==", promoCode)
                        .get()
                        .then((promoDocsSnapshot) => {
                          if (!promoDocsSnapshot.empty) {
                            const promoDoc = promoDocsSnapshot.docs[0];
                            // Update doc with new purchase
                            promoDoc.ref
                                .collection("renewals")
                                .add(request.body.data)
                                .catch((err) =>
                                  functions.logger.log(
                                      "Couldn't add new renewal doc",
                                      err
                                  )
                                );
                            // Update totalPurchases
                            if ("totalPurchases" in promoDoc.data()) {
                              promoDoc.ref
                                  .update({
                                    totalPurchases:
                              admin.firestore.FieldValue.increment(1),
                                    // eslint-disable-next-line max-len
                                    totalRevenue: admin.firestore.FieldValue.increment(
                                        request.body.data.price
                                    ),
                                  })
                                  .catch((err) =>
                                    functions.logger.log(
                                        "Error incrementing totalPurchases",
                                        err
                                    )
                                  );
                            } else {
                              promoDoc.ref
                                  .update({
                                    totalPurchases: 1,
                                    totalRevenue: request.body.data.price,
                                  })
                                  .catch((err) =>
                                    functions.logger.log(
                                        "Error incrementing totalPurchases",
                                        err
                                    )
                                  );
                            }
                          }
                        })
                        .catch((err) =>
                          functions.logger.log(
                              "Couldn't get doc with matching promoCode"
                          )
                        );
                  }
                }
              })
              .catch((err) =>
              // eslint-disable-next-line max-len
                functions.logger.log("Couldn't get user doc to see if promo used")
              );
        }
        admin
            .firestore()
            .doc("users/aGMk6uiO7OPpaMbhKLR1qG3h5Xm2")
            .get()
            .then((doc) => {
              const data = doc.data();
              if ("notificationToken" in data) {
                const token = data.notificationToken.token;
                let notification = {
                  title: "An IAPHUB Webhook was hit...",
                  body: `${request.body.type}`,
                };
                switch (request.body.type) {
                  case "purchase":
                    notification = {
                      title: "A user has bought a new subscription!",
                      // eslint-disable-next-line max-len
                      body: `A new ${request.body.data.productSku.trim()} subscription has been purchased`,
                    };
                    break;
                  case "subscription_renewal":
                    notification = {
                      title: "A user has renewed their subscription!",
                      // eslint-disable-next-line max-len
                      body: `A ${request.body.data.productSku.trim()} subscription has been renewed.`,
                    };
                    break;
                  case "subscription_cancel":
                    notification = {
                      title: "A user has canceled their subscription.",
                      // eslint-disable-next-line max-len
                      body: `A ${request.body.data.productSku.trim()} subscription has been cancelled.`,
                    };
                    break;
                  case "subscription_expire":
                    notification = {
                      title: "A user's subscription has expired.",
                      // eslint-disable-next-line max-len
                      body: `A ${request.body.data.productSku.trim()} subscription has just expired.`,
                    };
                    break;
                }
                const payload = {
                  notification: {
                    title: notification.title,
                    body: notification.body,
                    sound: "default",
                  },
                };
                admin
                    .messaging()
                    .sendToDevice(token, payload)
                    .then((value) => {
                      functions.logger.log("Send subscription noty", value);
                    })
                    .catch((err) => {
                      functions.logger.log("Couldn't send sub noty", err);
                    });
              } else {
                functions.logger.log("No notification token in user doc");
              }
            })
            .catch((err) => {
              functions.logger.log("Couldn't get your user doc Matthew.", err);
            });
        response.sendStatus(200);
      }
    }
);

/**
 * Triggers when a new payment is received to send Matthew/Cheryl
 * a notification to review
 * updates user badge to pending
 */

exports.verificationPaymentReceived = functions.firestore
    .document("customers/{uid}/payments/{paymentID}")
    .onCreate((snap, context) => {
      if (snap.data().status === "succeeded") {
        functions.logger.log("New Verification Payment Received");
        // First update badge to pending
        const uid = context.params.uid;
        admin
            .firestore()
            .doc(`users/${uid}`)
            .update({badge: "pending"})
            .then(() => functions.logger.log("User Badge Updated to Pending"))
            .catch((err) => functions.logger.error(err));

        admin
            .firestore()
            .doc(`verification/${uid}`)
            .update({status: "paymentReceived"})
            .then(() => functions.logger.log("Verification doc updated."))
            .catch((err) => functions.logger.error(err));

        let item;
        try {
          const itemDescription = snap.data().items[0].description;
          if (itemDescription.includes("Advanced")) {
            item = "Advanced Verification";
          } else {
            item = "Intermediate Verification";
          }
        } catch (err) {
          functions.logger.log("Couldn't get Item Description.");
        }
        const notification = {
          title: "Payment Received for Verification.",
          body:
          `New ${item ? item : "Verification"} ` + "purchased. Review ASAP.",
        };
        const payload = {
          notification: {
            title: notification.title,
            body: notification.body,
            sound: "default",
          },
        };

        // Next notify Cheryl/Matthew on payment success
        admin
            .firestore()
            .doc("users/aGMk6uiO7OPpaMbhKLR1qG3h5Xm2")
            .get()
            .then((doc) => {
              const data = doc.data();
              if ("notificationToken" in data) {
                const token = data.notificationToken.token;
                admin
                    .messaging()
                    .sendToDevice(token, payload)
                    .then(() =>
                    // eslint-disable-next-line max-len
                      functions.logger.log("Successfully send Matthew notification")
                    );
              } else {
                functions.logger.log(
                    "No notification token found for Cheryl/Matthew"
                );
              }
            });
        admin
            .firestore()
            .doc("users/Kh9LRgv0x4Zc1x8QtHVBDNkCvYG2")
            .get()
            .then((doc) => {
              const data = doc.data();
              if ("notificationToken" in data) {
                const token = data.notificationToken.token;
                admin
                    .messaging()
                    .sendToDevice(token, payload)
                    .then(() =>
                    // eslint-disable-next-line max-len
                      functions.logger.log("Successfully send Matthew notification")
                    );
              } else {
                functions.logger.log(
                    "No notification token found for Cheryl/Matthew"
                );
              }
            });
      } else if (snap.data().status === "canceled") {
        const uid = context.params.uid;
        admin
            .firestore()
            .doc(`verification/${uid}`)
            .update({status: "paymentCanceled"})
            .then(() => functions.logger.log("Verification doc updated."))
            .catch((err) => functions.logger.error(err));
      }
    });

/**
 * Triggers when a user gets a new message and sends a notification
 *
 *
 */

exports.sendMessageNotification = functions.firestore
    .document("users/{currentUID}/chats/{messagingUID}")
    .onWrite((change, context) => {
      functions.logger.log(
          "context.params:",
          context.params,
          "change.after.data()",
          change.after.data()
      );
      const messagingName =
      "displayName" in change.after.data() ?
        change.after.data().displayName :
        "Wadzoo User";
      const lastMessageText = change.after.data().text ?
      change.after.data().text :
      change.after.data().data ?
      "Sent you a property" :
      "Sent you a message";
      const outgoing = change.after.data().outgoing;
      if (!outgoing) {
        admin
            .firestore()
            .doc("users/" + context.params.currentUID)
            .get()
            .then((doc) => {
              const data = doc.data();
              if ("notificationToken" in data) {
                const token = data.notificationToken.token;
                admin
                    .messaging()
                    .sendMulticast({
                      tokens: [token],
                      data: {
                        notifee: JSON.stringify({
                          body: lastMessageText,
                          title: messagingName,
                          android: {
                            channelId: "default",
                          },
                          id: "message",
                          link: `applinks://message/${context.params.messagingUID}`,
                        }),
                      },
                    })
                    .then((res) =>
                    // eslint-disable-next-line max-len
                      functions.logger.log("Notification successfully sent", res)
                    );
              } else {
                functions.logger.log("No notificationToken Obj in user doc");
              }
            })
            .catch((err) => {
              functions.logger.log("Could not fetch user document", err);
            });
      }
    });

exports.giveUserProMembership = functions.firestore
    .document("users/{uid}")
    .onCreate((snap, context) => {
      admin
          .firestore()
          .doc("app/appInfo")
          .get()
          .then((docSnapshot) => {
            const {environment} = docSnapshot.data();
            if (environment === "development") {
              snap.ref
                  .update({
                    activeProducts: ["pro_monthly"],
                  })
                  .then(() => {
                    // eslint-disable-next-line max-len
                    functions.logger.log("Updated activeProducts to give free Pro");
                  })
                  .catch((err) =>
                    functions.logger.error("Error giving pro membership", err)
                  );
            }
          });
    });

exports.testSendDataMessage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "POST") {
      admin
          .firestore()
          .doc("users/aGMk6uiO7OPpaMbhKLR1qG3h5Xm2")
          .get()
          .then((userDoc) => {
            const userData = userDoc.data();
            if ("notificationToken" in userData) {
              const payload = req.body.payload;
              const token = userData.notificationToken.token;
              admin
                  .messaging()
                  .sendToDevice(token, payload, req.body.options)
                  .then(() =>
                  // eslint-disable-next-line max-len
                    res.json({
                      token,
                      payload,
                    })
                  )
                  .catch((err) => res.json(err));
            } else {
              res.json({message: "No notification token found"});
            }
          })
          .catch((err) => res.json(err));
    } else {
      res.json({error: "Access Forbidden"});
    }
  });
});

exports.addGeolocToUsers = functions.firestore
    .document("users/{uid}")
    .onCreate((snap, context) => {
      if (!("_geoloc" in snap.data())) {
        if ("location" in snap.data()) {
          if ("lat" in snap.data().location && "lng" in snap.data().location) {
            snap.ref
                .update({
                  _geoloc: {
                    lat: snap.data().location.lat,
                    lng: snap.data().location.lng,
                  },
                })
                .then(() => {
                  functions.logger.log("Added _geoloc");
                  return true;
                })
                .catch((err) => {
                  functions.logger.error(
                      "Could not add _geoloc to user",
                      context.params.uid
                  );
                  return false;
                });
          } else {
            functions.logger.error(
                "Could not add _geoloc to user",
                context.params.uid
            );
            return false;
          }
        } else {
          functions.logger.error("No location obj in user", context.params.uid);
        }
      } else {
        functions.logger.log("_geoloc already in user", context.params.uid);
        return true;
      }
    });

exports.addGeolocToProperties = functions.firestore
    .document("listings/{docID}")
    .onCreate((snap, context) => {
      if (!("_geoloc" in snap.data())) {
        if ("lat" in snap.data() && "lng" in snap.data()) {
          snap.ref
              .update({
                _geoloc: {
                  lat: snap.data().lat,
                  lng: snap.data().lng,
                },
              })
              .then(() => {
                functions.logger.log("Added _geoloc", context.params.docID);
                return true;
              })
              .catch((err) => {
                functions.logger.error(
                    "Could not add _geoloc to properties",
                    context.params.docID
                );
                return false;
              });
        } else {
          functions.logger.error(
              "Could not add _geoloc to properties1",
              context.params.docID
          );
          return false;
        }
      } else {
      // eslint-disable-next-line max-len
        functions.logger.log("_geoloc already in property", context.params.docID);
        return true;
      }
    });

exports.addGeolocToPosts = functions.firestore
    .document("posts/{docID}")
    .onCreate((snap, context) => {
      functions.logger.log("Updating posts with _geoloc");
      if (!("_geoloc" in snap.data())) {
        if ("lat" in snap.data() && "lng" in snap.data()) {
          snap.ref
              .update({
                _geoloc: {
                  lat: snap.data().lat,
                  lng: snap.data().lng,
                },
              })
              .then(() => {
                functions.logger.log("Added _geoloc", context.params.docID);
                return true;
              })
              .catch((err) => {
                functions.logger.error(
                    "Could not add _geoloc to posts",
                    context.params.docID
                );
                return false;
              });
        } else {
          functions.logger.error(
              "Could not add _geoloc to posts1",
              context.params.docID
          );
          return false;
        }
      } else {
        functions.logger.log("_geoloc already in post", context.params.docID);
        return true;
      }
    });

exports.notifyAffiliates = functions.firestore
    .document("promoCodes/{codeDocID}")
    .onUpdate((change, context) => {
      functions.logger.log("Updated affiliateDoc:", context.params.codeDocID);
      // Check for notifyAffiliates, notifyAccordingly, always notify Matthew
      const b4TotalPurchases =
      "totalPurchases" in change.before.data() ?
        Number(change.before.data().totalPurchases) :
        0;
      // eslint-disable-next-line max-len
      const afterTotalPurchases = Number(change.after.data().totalPurchases);
      // eslint-disable-next-line max-len
      const shouldSendNoty = afterTotalPurchases > b4TotalPurchases;
      if (shouldSendNoty) {
        admin
            .firestore()
            .doc("app/appInfo")
            .get()
            .then((docSnap) => {
              if (docSnap.data().notifyAffiliates) {
                // if we are supposed to notify, search for affiliate user doc
                const data = {
                  service_id: "wadzoo",
                  template_id: "affiliate-code-used",
                  user_id: "user_O8a39t79Xp7F45Kwvqx7L",
                  template_params: {
                    name:
                  "displayName" in change.after.data() ?
                    change.after.data().displayName :
                    "Wadzoo Affiliate",
                    code: change.after.data().promoCode,
                    share: change.after.data().shareOfTotalPurchase,
                    amt_earned: (
                      Number(change.after.data().shareOfTotalPurchase) * 29.99
                    ).toFixed(2),
                    email: change.after.data().email,
                  },
                };
                axios
                    .post("https://api.emailjs.com/api/v1.0/email/send", {
                      data: JSON.stringify(data),
                      contentType: "application/json",
                    })
                    .then((res) => {
                      functions.logger.log("Email sent with res:", res);
                    })
                    .catch((err) => {
                      functions.logger.log("Email not sent, err: ", err);
                    });
                admin
                    .firestore()
                    .doc(`users/${change.after.data().user}`)
                    .get()
                    .then((userDoc) => {
                      admin
                          .firestore()
                          .doc("users/aGMk6uiO7OPpaMbhKLR1qG3h5Xm2")
                          .get()
                          .then((maphDoc) => {
                            // eslint-disable-next-line max-len
                            const maphToken = maphDoc.data().notificationToken.token;
                            // eslint-disable-next-line max-len
                            if ("notificationToken" in userDoc.data()) {
                              // eslint-disable-next-line max-len
                              const token = userDoc.data().notificationToken.token;
                              admin
                                  .messaging()
                                  .sendMulticast({
                                    tokens: [token, maphToken],
                                    data: {
                                      notifee: JSON.stringify({
                                        // eslint-disable-next-line max-len
                                        body: "Your affiliate code was just used! An email will be sent shortly with more information.",
                                        title: `Affiliate Code Used (${
                                          change.after.data().promoCode
                                        })`,
                                        android: {
                                          channelId: "default",
                                        },
                                      }),
                                    },
                                  })
                                  .then((res) =>
                                  // eslint-disable-next-line max-len
                                    functions.logger.log(
                                        "Notification successfully sent",
                                        res
                                    )
                                  );
                            } else {
                              // eslint-disable-next-line max-len
                              functions.logger.log(
                                  "No notificationToken Obj in user doc"
                              );
                            }
                          })
                          .catch((err) => functions.logger.error(err));
                    })
                    .catch((err) => functions.logger.error(err));
              }
            });
      }
    });

exports.sendNotyToEmail = functions.https.onRequest((req, res) =>
  cors(req, res, () => {
    if (req.method === "POST") {
      const email = req.body.data.email;
      // get notification token
      admin
          .firestore()
          .collection("users")
          .where("email", "==", email)
          .get()
          .then((querySnap) => {
            if (querySnap.empty) {
              res.send(`No user with email ${email}`);
            } else {
              if ("notificationToken" in querySnap.docs[0].data()) {
                const token = querySnap.docs[0].data().notificationToken.token;
                const notyMethod = req.body.data.notyMethod;
                if (notyMethod === "multicast") {
                  admin
                      .messaging()
                      .sendMulticast({
                        tokens: [token],
                        data: req.body.data.notificationPayload,
                      })
                      .then((result) => res.json(result))
                      .catch((err) => res.json(err));
                } else if (notyMethod === "sendToDevice") {
                  admin
                      .messaging()
                      .sendToDevice(token, req.body.data.notificationPayload)
                      .then((result) => res.json(result))
                      .catch((err) => res.json(err));
                }
              } else {
              // eslint-disable-next-line max-len
                res.send(`No notificationToken for user ${querySnap.docs[0].id}`);
              }
            }
          })
          .catch((err) => res.json(err));
    } else {
      res.send(`Not allowed to ${req.method} at this endpoint.`);
    }
  })
);
