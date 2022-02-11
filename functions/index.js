const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello Wadzoo user, you have found our API...");
});

/**
 * This function receives a webhook from IAPHUB,
 * it will send me a notification to my phone.
 */

exports.iaphubSubscriptionNoty = functions.https
    .onRequest((request, response) => {
      functions.logger.log("NEW IAPHUB REQUEST, METHOD:",
          request.method, request);
      if (request.method === "POST") {
        admin.firestore()
            .doc("users/aGMk6uiO7OPpaMbhKLR1qG3h5Xm2")
            .get()
            .then((doc) => {
              const data = doc.data();
              if ("notificationToken" in data) {
                const token = data.notificationToken.token;
                let notification = {
                  title: "An IAPHUB Webhook was hit...",
                  body: "The title/body have not been set.",
                };
                switch (request.body.type) {
                  case "purchase":
                    notification = {
                      title: "A user has bought a new subscription!",
                      body: `A new ${request.body.data.productSku.trim()} 
                            subscription has been purchased`,
                    };
                    break;
                  case "subscription_renewal":
                    notification = {
                      title: "A user has renewed their subscription!",
                      body: `A ${request.body.data.productSku.trim()}
                      subscription has been renewed.`,
                    };
                    break;
                  case "subscription_cancel":
                    notification = {
                      title: "A user has canceled their subscription.",
                      body: `A ${request.body.data.productSku.trim()}
                      subscription has been cancelled.`,
                    };
                    break;
                  case "subscription_expire":
                    notification = {
                      title: "A user's subscription has expired.",
                      body: `A ${request.body.data.productSku.trim()}
                      subscription has just expired.`,
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
                admin.messaging().sendToDevice(token, payload)
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
    });


/**
 * Triggers when a user gets a new message and sends a notification
 *
 *
 */

exports.sendMessageNotification = functions.firestore
    .document("users/{currentUID}/messages/{messagingUID}")
    .onWrite((change, context) => {
      functions.logger.log("context.params:",
          context.params, "change.after.data()",
          change.after.data());
      const messagingName = change.after.data().firstName + " " +
      change.after.data().lastName;
      const messages = change.after.data().messages;
      const lastMessage = messages[messages.length - 1];
      const lastMessageText = lastMessage.text;
      const lastMessageStyle = lastMessage.style;
      const profilePicURL = change.after.data().profilePicURL;
      if (lastMessageStyle === "from") {
        admin.firestore()
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
                    image: profilePicURL,
                  },
                  data: {
                    profilePicURL: profilePicURL,
                  },
                };
                admin.messaging().sendToDevice(token, payload)
                    .then((value) => {
                      functions.logger
                          .log("Successfully sent user notification", value);
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
