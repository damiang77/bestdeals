import React, {createContext, useState, useEffect} from 'react';
import {getJwt} from "../../helpers/jwt";

export const UserContext = createContext();


export const UserProvider = (props) =>{
    const [user, setUser] = useState(null);


    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

