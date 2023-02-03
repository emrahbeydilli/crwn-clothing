import { useEffect } from "react";
import { getRedirectResult, onAuthStateChanged, signInWithRedirect } from "firebase/auth";

import {
   auth,
   signInWithGooglePopup,
   signInWithGoogleRedirect,
   createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";


const SignIn = () => {

   useEffect(()=> {
      const createUser = async()=>{
         const response = await getRedirectResult(auth);
         if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
         }
      }
      createUser();
   },[])

   const logGoogleUser = async () => {
      const {user} = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
   }

   return (
      <div>
         <h1>Sign In Page</h1>
         <button onClick={logGoogleUser}>
            Sign in with Google
         </button>
         <button onClick={signInWithGoogleRedirect}>
            Sign in with Google Redirect
         </button>
      </div>
   );
}

export default SignIn;