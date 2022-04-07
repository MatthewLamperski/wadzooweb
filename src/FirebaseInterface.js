import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import {db, secondaryApp} from "./App";
import emailjs from "@emailjs/browser";

// Auth Functions
export const continueWithGoogleRedirect = () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then((result) => {
        resolve(result.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const continueWithGooglePopup = () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        resolve(result.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getRedirect = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => resolve(result.user))
      .catch((err) => reject(err));
  });
};

export const signInWithEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => resolve(result.user))
      .catch((err) => reject(err));
  });
};

export const createUser = ({
  firstName,
  lastName,
  email,
  companyName,
  phoneNumber,
  uid,
}) => {
  return new Promise((resolve, reject) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 8; i > 0; --i)
      password += chars[Math.floor(Math.random() * chars.length)];
    let since = new Date();
    const auth = getAuth(secondaryApp);
    if (uid) {
      updateDoc(doc(db, "users", uid), {
        firstName,
        lastName,
        email,
        ...(companyName ? { companyName } : {}),
        ...(phoneNumber ? { phoneNumber } : {}),
      }).then(() => {
        resolve({
          newUser: {
            uid,
            email,
            password,
            firstName,
            lastName,
            ...(companyName ? { companyName } : {}),
            ...(phoneNumber ? { phoneNumber } : {}),
          },
        });
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((newUserCredential) => {
          setDoc(doc(db, "users", newUserCredential.user.uid), {
            firstName,
            lastName,
            email,
            since,
            ...(companyName ? { companyName } : {}),
            ...(phoneNumber ? { phoneNumber } : {}),
          })
            .then(() => {
              emailjs
                .send(
                  "wadzoo",
                  "wadzoo-account-creation",
                  {
                    email,
                    firstName,
                  },
                  "user_O8a39t79Xp7F45Kwvqx7L"
                )
                .then((status) => {
                  resolve({
                    newUser: {
                      uid: newUserCredential.user.uid,
                      email,
                      password,
                      firstName,
                      lastName,
                      since,
                      ...(companyName ? { companyName } : {}),
                      ...(phoneNumber ? { phoneNumber } : {}),
                    },
                  });
                })
                .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    }
  });
};

export const signMeOut = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

//Firestore Functions
export const getUserDoc = (uid) => {
  return new Promise((resolve, reject) => {
    const userDoc = doc(db, "users", uid);
    getDoc(userDoc)
      .then((doc) => {
        if (doc.exists()) {
          resolve({
            uid: doc.id,
            ...doc.data(),
          });
        } else {
          reject({ code: "Doc does not exist" });
        }
      })
      .catch((err) => reject(err));
  });
};

export const findUsersByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const q = query(
      collection(db, "users"),
      where("email", ">=", email),
      where("email", "<=", email + "\uf8ff")
    );
    getDocs(q)
      .then((snapshot) => {
        let users = [];
        snapshot.forEach((userDoc) => {
          users.push({ uid: userDoc.id, ...userDoc.data() });
        });
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getProdListings = (lastVisible) => {
  return new Promise((resolve, reject) => {
    const q = lastVisible
      ? query(
          collection(db, "listings"),
          where("environment", "==", "production"),
          orderBy("created", "desc"),
          startAfter(lastVisible),
          limit(30)
        )
      : query(
          collection(db, "listings"),
          where("environment", "==", "production"),
          orderBy("created", "desc"),
          limit(30)
        );
    getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          let listings = snapshot.docs.map((listingDoc) => ({
            docID: listingDoc.id,
            ...listingDoc.data(),
          }));
          resolve({
            listings,
            lastVisible: snapshot.docs[snapshot.docs.length - 1]
              ? snapshot.docs.length < 30
                ? null
                : snapshot.docs[snapshot.docs.length - 1]
              : null,
          });
        } else {
          resolve({
            listings: [],
            lastVisible: null,
          });
        }
      })
      .catch((err) => reject(err));
  });
};

export const getListing = (docID) => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, `/listings/${docID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve({
            docID: snapshot.id,
            ...snapshot.data(),
          });
        } else {
          reject(".exists() false");
        }
      })
      .catch((err) => reject(err));
  });
};

export const createVerificationRequest = (request, files) => {
  return new Promise((resolve, reject) => {
    setDoc(doc(db, `/verification/${request.uid}`), request)
      .then((newDoc) => {
        console.log(newDoc);
        if (files) {
          const storage = getStorage();
          let filesUploaded = 0;
          for (let i = 0; i < files.length; i++) {
            uploadBytes(ref(storage, `/verification/${newDoc.id}`), files[0])
              .then(() => {
                filesUploaded++;
                if (filesUploaded === files.length) {
                  resolve();
                }
              })
              .catch((err) => reject());
          }
        } else {
          resolve();
        }
      })
      .catch((err) => reject(err));
  });
};

export const createStripePaymentSession = (uid, service) => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, `/products/${service}`))
      .then((docSnapshot) => {
        if (!docSnapshot.exists()) {
          reject("Product not found");
        }
        console.log(docSnapshot.data());
        const { price } = docSnapshot.data();
        const checkoutInfo = {
          mode: "payment",
          price,
          success_url: window.location.origin + "/badgeStatus",
          cancel_url: window.location.origin + `/checkout/${service}`,
        };
        addDoc(
          collection(db, `/customers/${uid}/checkout_sessions`),
          checkoutInfo
        )
          .then((session_doc) => {
            console.log(session_doc.path);
            onSnapshot(doc(db, session_doc.path), (snapshot) => {
              const { error, url } = snapshot.data();
              if (error) {
                reject(error);
              }
              if (url) {
                resolve(url);
              }
            });
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

export const createListing = (listing, images, docID) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    if (docID) {
      updateDoc(doc(db, `/listings/${docID}`), listing)
        .then(() => {
          if (images) {
            let imageUploads = [];
            for (let i = 0; i < images.length; i++) {
              uploadBytes(
                ref(storage, `/listings/${docID}/${docID}${i}`),
                images[i]
              )
                .then(() => {
                  getDownloadURL(
                    ref(storage, `/listings/${docID}/${docID}${i}`)
                  ).then((url) => {
                    imageUploads.push(url);
                    if (imageUploads.length === images.length) {
                      updateDoc(doc(db, `/listings/${docID}`), {
                        images: imageUploads,
                      })
                        .then((listingDocWithImages) => {
                          updateDoc(doc(db, `/users/${listing.lister}`), {
                            phoneNumber: listing.phoneNumber,
                            companyName: listing.companyName,
                          });
                          resolve(listingDocWithImages);
                        })
                        .catch((err) => {
                          console.log("4", err);
                          reject({
                            title: "Something went wrong.",
                            message:
                              "Here is the error: " + JSON.stringify(err),
                          });
                        });
                    }
                  });
                })
                .catch((err) => {
                  console.log("1", err);
                  reject({
                    title: "Something went wrong.",
                    message: "Here is the error: " + JSON.stringify(err),
                  });
                });
            }
          } else {
            updateDoc(doc(db, `/users/${listing.lister}`), {
              phoneNumber: listing.phoneNumber,
              companyName: listing.companyName,
            });
            resolve();
          }
        })
        .catch((err) => reject(err));
    } else {
      // Check if listing exists with that address
      const q = query(
        collection(db, "listings"),
        where("lat", "==", listing.lat),
        where("lng", "==", listing.lng)
      );
      getDocs(q)
        .then((snapshot) => {
          if (snapshot.empty) {
            // Add doc to db
            addDoc(collection(db, "listings"), listing)
              .then((newListingDoc) => {
                updateDoc(doc(db, `/users/${listing.lister}`), {
                  listings: arrayUnion(newListingDoc.id),
                  phoneNumber: listing.phoneNumber,
                  companyName: listing.companyName,
                })
                  .then(() => {
                    if (images) {
                      let imageUploads = [];
                      for (let i = 0; i < images.length; i++) {
                        uploadBytes(
                          ref(
                            storage,
                            `/listings/${newListingDoc.id}/${newListingDoc.id}${i}`
                          ),
                          images[i]
                        )
                          .then(() => {
                            getDownloadURL(
                              ref(
                                storage,
                                `/listings/${newListingDoc.id}/${newListingDoc.id}${i}`
                              )
                            ).then((url) => {
                              imageUploads.push(url);
                              if (imageUploads.length === images.length) {
                                updateDoc(
                                  doc(db, `/listings/${newListingDoc.id}`),
                                  { images: imageUploads }
                                )
                                  .then((listingDocWithImages) => {
                                    resolve(listingDocWithImages);
                                  })
                                  .catch((err) => {
                                    console.log("4", err);
                                    reject({
                                      title: "Something went wrong.",
                                      message:
                                        "Here is the error: " +
                                        JSON.stringify(err),
                                    });
                                  });
                              }
                            });
                          })
                          .catch((err) => {
                            console.log("1", err);
                            reject({
                              title: "Something went wrong.",
                              message:
                                "Here is the error: " + JSON.stringify(err),
                            });
                          });
                      }
                    } else {
                      resolve(newListingDoc);
                    }
                  })
                  .catch((err) => {
                    console.log("2", err);
                    reject({
                      title: "Something went wrong.",
                      message: "Here is the error: " + JSON.stringify(err),
                    });
                  });
              })
              .catch((err) => {
                console.log("3", err);
                reject({
                  title: "Something went wrong.",
                  message: "Here is the error: " + JSON.stringify(err),
                });
              });
          } else {
            reject({
              title: "It looks like this listing already exists.",
              message: "Contact Matthew if you see this message.",
            });
          }
        })
        .catch((err) => {
          console.log("1", err);
          reject({
            title: "Something went wrong.",
            message: "Here is the error: " + JSON.stringify(err),
          });
        });
    }
  });
};

export const getAppInfo = () => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, "/app/appInfo"))
      .then((docSnapshot) => resolve({ ...docSnapshot.data() }))
      .catch((err) => reject(err));
  });
};

export const getProfilePicURL = (uid) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const pictureRef = ref(storage, `/profilePictures/${uid}`);
    getDownloadURL(pictureRef)
      .then((url) => resolve(url))
      .catch((err) => reject(err));
  });
};

export const uploadProfilePic = (uid, image) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    uploadBytes(ref(storage, `/profilePictures/${uid}`), image)
      .then((res) => {
        getDownloadURL(res.ref)
          .then((url) => resolve(url))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
