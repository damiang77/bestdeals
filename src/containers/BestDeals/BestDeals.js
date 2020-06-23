import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import { getJwt } from "../../helpers/jwt.js";
import Axios from "axios";

const BestDeals = (props) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const jwt = getJwt();
    console.log(jwt);
    if (!jwt) {
      const config = {
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      Axios.get("https://gar.ovh/bd/api/v1/deals")
        .then((dealsJson) => {
          setDeals(dealsJson.data);
        })
        .catch((err) => {
          console.log(err);
          console.log(deals);
        });
    } else {
      const config = {
        headers: {
          "access-control-allow-origin": "*",
          "x-auth": jwt,
        },
      };
      Axios.get("https://gar.ovh/bd/api/v1/deals/user", config)
        .then((dealsJson) => {
          setDeals(dealsJson.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="page">
      <Cards deals={deals} />
    </div>
  );
};

export default BestDeals;
