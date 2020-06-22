import React, { useContext } from "react";
import Aux from "../../hoc/Aux";
import Card from "./Card/Card";
import { AppContext } from "../../containers/AppContext/AppContext";
const Cards = props => {
  
  return (
    <Aux>
      <div className="container-fluid bgcolor-main">
        <div className="row">
          <div className="container bgcolor-1">
            <div className="row">
              {props.deals.map(deal => (
                <Card key={deal._id} deal={deal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Cards;
