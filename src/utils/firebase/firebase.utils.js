
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collectionGroup
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqxyScuK20mIW4P16TFI7I4Qys_-GAbVY",
  authDomain: "crwn-clothing-db-5ea40.firebaseapp.com",
  projectId: "crwn-clothing-db-5ea40",
  storageBucket: "crwn-clothing-db-5ea40.appspot.com",
  messagingSenderId: "60420633067",
  appId: "1:60420633067:web:619d23b33db86a869d69ae"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());
}