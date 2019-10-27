import React, { useContext, useState, useEffect} from "react";
import Aux from "../../../hoc/Aux";
import "./Card.css";
import CardButton from "./Button/Button";
import { Link } from "react-router-dom";
import Vote from "./Vote/Vote";
import { UserContext } from "../../../containers/AppContext/UserContext";
import TimeAgo from 'react-timeago'

const Card = props => {
  const [user, setUser] = useContext(UserContext);
  const [points, setPoints] = useState()
  
  useEffect(()=>{
    setPoints(props.deal.points)
    
  }, [props])

  const changePoints = (value) =>{
    setPoints(points+value)
  }
  return(
  <Aux>
    <div className="col-xl-3 col-md-4 col-sm-6 col-xs-12">
      <div className="main-card">
        <div className="main-card-header">
          <div className="timer">
          <TimeAgo date={props.deal.date} />
          </div>
          <div className="vote">
          { user ? <Vote item={props} change={changePoints}/> : null  }
          <div className="vote-value">{points}{String.fromCharCode(176)}</div>
          </div>
        </div>
        <img
          src={props.deal.image}
          className="main-card-image"
          alt={props.deal.itemName}
        />
        <h4>{props.deal.title}</h4>
        <div className="main-card-content">
          <div className="main-card-pricing">
            <p>{props.deal.price}</p>
            <p>{props.deal.oldPrice}</p>
          </div>
          <p>{props.deal.description}</p>
          <Link to={`/item/${props.deal._id}`}>
            <CardButton name={"Przejdz do okazji"} />
          </Link>
        </div>
      </div>
    </div>
  </Aux>
  )
};

export default Card;
