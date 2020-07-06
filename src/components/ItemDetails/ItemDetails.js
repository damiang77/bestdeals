import React, { useContext, useState, useEffect } from "react";
import Aux from "../../hoc/Aux";
import { UserContext } from "../../containers/AppContext/UserContext";
import TimeAgo from "react-timeago";
import Axios from "axios";
import UserImg from "../../assets/user2.png";
import LinkSvg from "../../assets/link.svg";
import PercentLabel from "./PercentLabel/PercentLabel";
import CommentList from "./CommentList/CommentList";
import CommentForm from "./CommentList/CommentForm/CommentForm";
import {url} from "../../helpers/constants";

const ItemDetails = ({ match }) => {
  const [item, setItem] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  function fetchData() {

    Axios.get(`${url.API_URL}/deals/${match.params.id}`).then(
      (fetchItem) => {
        console.log(fetchItem.data)
        setItem(fetchItem.data);
        setIsLoading(false);
      }
    ).catch((e)=>{
      console.log(e);
    });
  }

  const style = {
    paddingTop: "80px",
  };

  return (
    <Aux>
 { isLoading ? <div className="loader"></div> : 
      <div className="container" style={style}>
      
        <div className="row">
          <div className="col-xl-4 image-detail-wrapper">
            <img src={item.image} />
          </div>
          <div className="col-xl-8 item-detail-column">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <div className="button-section">
              <a target="_blank" href={item.url}>
                <button className="item-button">
                  Go to the deal <img src={LinkSvg} />
                </button>
              </a>
            </div>
            <div id="grid">
              <div className="grid-title">Actual price</div>
              <div className="grid-value main-price">
                {item.price} zł{" "}
                <PercentLabel price={item.price} oldPrice={item.oldPrice} />
              </div>
              <div className="grid-title">Old price</div>
              <div className="grid-value line-through">{item.oldPrice} zł</div>
              <div className="grid-title">Added</div>
              <div className="grid-value">
                <TimeAgo date={item.date} />
              </div>
              <div className="grid-title">Hot votes</div>
              <div className="grid-value">
                {item.points}
                {String.fromCharCode(176)}
              </div>
              <div className="grid-img">
                <img src={UserImg} />
                {item.user}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <CommentList comments={item.comments} />
        </div>
        <div className="row">
          <CommentForm itemId={item._id} />
        </div>
      </div>}
    </Aux>
  );
}
export default ItemDetails;
