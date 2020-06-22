import React, {useContext, createContext, useState, useEffect} from 'react';
import { getJwt } from "../../helpers/jwt";


export const AppContext = createContext();

export const AppProvider = (props) =>{
    const [deals, setDeals] = useState([]);
  


    return(
        <AppContext.Provider value={[deals, setDeals]}>
            {props.children}
        </AppContext.Provider>
    );
}

