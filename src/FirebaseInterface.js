import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "./App";

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
      where("email", ">=", email.toLowerCase()),
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
