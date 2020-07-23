import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import { getJwt } from "../../helpers/jwt.js";
import { url } from "../../helpers/constants";
import Axios from "axios";
import ErrorBoundary from "../../helpers/ErrorBoundary";

const BestDeals = (props) => {
  const [deals, setDeals] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataFromServer();

    return () => {
      setHasError(false);
      setDeals([]);
    };
  }, []);

  const getDataFromServer = () => {
    const jwtToken = getJwt();
    if (!jwtToken) {
      const config = {
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      Axios.get(`${url.API_URL}/deals`)
        .then((dealsJson) => {
          setDeals(dealsJson.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setHasError(true);
          setIsLoading(false);
        });
    } else {
      const config = {
        headers: {
          "access-control-allow-origin": "*",
          "x-auth": jwtToken,
        },
      };
      Axios.get(`${url.API_URL}/deals/user`, config)
        .then((dealsJson) => {
          setDeals(dealsJson.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setHasError(true);
          setIsLoading(false);
        });
    }
  };

  const errorHeaderWrapper = {
    paddingTop: "100px",
    paddingBottom: "50px",
    textAlign: "center",
  };

  if (hasError) {
    return (
      <div style={errorHeaderWrapper}>
        <h4>Could not connect to server.</h4>
      </div>
    );
  }

  return (
    <div className="page">
     
      {isLoading ? (
          <div className="loader"></div>
      ) : (
        <ErrorBoundary>
          <Cards deals={deals} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default BestDeals;
