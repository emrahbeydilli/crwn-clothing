import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// for state functionality, component itself
export const UserProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(()=>{
        const unsubcribe = onAuthStateChangedListener((user)=>{
            console.log(user);
        });

        return unsubcribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}