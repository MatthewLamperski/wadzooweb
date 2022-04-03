const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});
const client = new PlaidApi(configuration);

exports.testEnv = functions.https.onRequest((req, res) => {
  res.send(
      `Here is what the environment variables returned: 
      ${process.env.TEST1} ${process.env.TEST2}`
  );
});

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
      functions.logger.log("New Verification Payment Received");
      // First update badge to pending
      const uid = context.params.uid;
      admin
          .firestore()
          .doc(`users/${uid}`)
          .update({badge: "pending"})
          .then(() => functions.logger.log("User Badge Updated to Pending"))
          .catch((err) => functions.logger.error(err));

      // Next notify Cheryl/Matthew
      admin
          .firestore()
          .doc("users/aGMk6uiO7OPpaMbhKLR1qG3h5Xm2")
          .get()
          .then((doc) => {
            const data = doc.data();
            if ("notificationToken" in data) {
              const token = data.notificationToken.token;
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
              `New ${item ? item : "Verification"} ` +
              "purchased. Review ASAP.",
              };
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
      const messagingName = change.after.data().displayName;
      const lastMessageText = change.after.data().text;
      const outgoing = change.after.data().outgoing;
      const profilePicURL = change.after.data().profilePicURL ?
      change.after.data().profilePicURL :
      "none";
      if (!outgoing) {
        admin
            .firestore()
            .doc("users/" + context.params.currentUID)
            .get()
            .then((doc) => {
              const data = doc.data();
              if ("notificationToken" in data) {
                const token = data.notificationToken.token;
                const payload = {
                  notification: {
                    title: messagingName,
                    body: lastMessageText,
                    sound: "default",
                  },
                  data: {
                    type: "message",
                    profilePicURL: profilePicURL,
                  },
                };
                admin
                    .messaging()
                    .sendToDevice(token, payload)
                    .then((value) => {
                      functions.logger.log(
                          "Successfully sent user notification",
                          value
                      );
                    })
                    .catch((err) => {
                      functions.logger.log("Error sending notification", err);
                    });
              } else {
                functions.logger.log("No notificationToken Obj in user doc");
              }
            })
            .catch((err) => {
              functions.logger.log("Could not fetch user document", err);
            });
      }
    });
