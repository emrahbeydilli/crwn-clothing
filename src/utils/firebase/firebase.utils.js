
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Firestore
export const db = getFirestore();

// Save local dataset to Firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
}

// Create a category map from Firestore Dataset
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}

/*
{
  hats: {
    title: 'Hats',
    items:[
      {},
      {},
    ],
  },
  sneakers: {
    title: 'Sneakars',
    items:[
      {},
      {},
    ],
  },
}
*/



export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid); //collection > document

  const userSnapShot = await getDoc(userDocRef); //data

  // If user data exists
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,
        {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        }
      );
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

// Email/Password Provider
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

// Email/Password Sign In
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

// Sign Out User
export const signOutUser = async () => await signOut(auth);

// Observable Listener
export const onAuthStateChangedListener = (callback) => {
  // if (!callback) return;
  onAuthStateChanged(auth, callback);
}  