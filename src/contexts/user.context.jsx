import { createContext, useReducer } from 'react';


// as the actual value you want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});



// for state functionality, component itself
export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);


    
    
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

/* 

const userReducer = (state,action) => {

    return {
        currentUser:null,
    }
}

*/