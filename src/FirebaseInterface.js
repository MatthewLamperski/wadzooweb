import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  query,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, secondaryApp } from "./App";
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

export const createUser = ({ firstName, lastName, email }) => {
  return new Promise((resolve, reject) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 8; i > 0; --i)
      password += chars[Math.floor(Math.random() * chars.length)];
    let since = new Date();
    const auth = getAuth(secondaryApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then((newUserCredential) => {
        setDoc(doc(db, "users", newUserCredential.user.uid), {
          firstName,
          lastName,
          email,
          since,
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
                  },
                });
              })
              .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
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

export const createListing = (listing, images) => {
  return new Promise((resolve, reject) => {
    // Check if listing exists with that address
    const storage = getStorage();
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
