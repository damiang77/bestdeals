import React, {useState, useEffect}from 'react';
import Cards from '../../components/Cards/Cards';
import {getJwt} from "../../helpers/jwt.js";

const BestDeals = (props) => {
    const [deals, setDeals] = useState([]);
  
    useEffect( ()=>{
     const jwt = getJwt();
     console.log(jwt)
     if (!jwt) {
         fetch('http://localhost:3001/api/v1/deals',{
             method: "GET",
             headers: {
               "access-control-allow-origin" : "*",
               "Content-type": "application/json; charset=UTF-8"
             }})
           .then(res => res.json())
           .then(dealsJson => setDeals(dealsJson)).catch((err)=>{
               console.log(err)
           });
          
     }else{
         fetch('http://localhost:3001/api/v1/deals/user',{
             method: "GET",
             headers: {
               "access-control-allow-origin" : "*",
               "x-auth": jwt
             }})
           .then(res => res.json())
           .then(dealsJson => setDeals(dealsJson)).catch((err)=>{
               console.log(err)
           })
     }
 
    }, []);
 
    
        return(
            <div className="page">
                <Cards deals={deals}/>
            </div>
        )

}

export default BestDeals;