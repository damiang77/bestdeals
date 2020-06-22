import React, { useContext, useState, useEffect } from "react";
import Aux from "../../../hoc/Aux";
import "./Card.css";
import CardButton from "./Button/Button";
import { Link } from "react-router-dom";
import Vote from "./Vote/Vote";
import { UserContext } from "../../../containers/AppContext/UserContext";
import TimeAgo from "react-timeago";
import PercentLabel from "../../ItemDetails/PercentLabel/PercentLabel";

const Card = props => {
  const [user, setUser] = useContext(UserContext);
  const [points, setPoints] = useState();

  useEffect(() => {
    setPoints(props.deal.points);
  }, [props]);

  const changePoints = value => {
    setPoints(points + value);
  };
  return (
    <Aux>
      <div className="col-xl-3 col-md-4 col-sm-6 col-xs-12">
        <div className="main-card">
          <div className="main-card-header">
            <div className="timer">
              <TimeAgo date={props.deal.date} />
            </div>
            <div className="vote">
              {user ? <Vote item={props.deal} change={changePoints} /> : null}
              <div className="vote-value">
                {points}
                {String.fromCharCode(176)}
              </div>
            </div>
          </div>
          <div className="main-card-image-wrapper">
          <img
            src={props.deal.image}
            className="main-card-image"
            alt={props.deal.itemName}
          />
          </div>

          <div className="main-card-content">
            <h4>{props.deal.title}</h4>
            <div className="main-card-pricing">
              <p>{props.deal.price}zł</p>
              <p>{props.deal.oldPrice}zł</p>
              <PercentLabel price={props.deal.price} oldPrice={props.deal.oldPrice}/>
            </div>
            <Link to={`/item/${props.deal._id}`}>
              <CardButton name={"Details"} />
            </Link>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Card;
