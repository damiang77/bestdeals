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

function ItemDetails({ match }) {
  const [item, setItem] = useState({});
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchData();
  }, []);

  function fetchData() {
    Axios.get(`http://localhost:3001/api/v1/deals/${match.params.id}`).then(
      (fetchItem) => {
        setItem(fetchItem.data);
      }
    );
  }

  const style = {
    paddingTop: "80px",
  };
  const comments = {
    comments: [
      {
        id: 1,
        body:
          "example comment 1  Saturna (z uwagi na pierścienie), poza tym Księżyc ziemski, bliższe planety i poza miastem galaktyki oraz inne obiekty nocnego nieba.",
        author: "ddamis",
        date: "2019-11-11T16:00:49.461Z",
      },
      {
        id: 5,
        body:
          "sdfgsfdSaturna (z uwagi na pierścienie), poza tym Księżyc ziemski, bliższe planety i poza miastem galaktyki oraz inne obiekty nocnego nieba.",
        author: "pola",
        date: "2019-11-10T16:00:49.461Z",
      },
      {
        id: 2,
        body: "example comment 2",
        author: "krysti",
        date: "2019-11-11T16:10:49.461Z",
      },
      {
        id: 3,
        body: "example comment 3",
        author: "jole",
        date: "2019-11-11T16:22:49.461Z",
      },
      {
        id: 4,
        body: "example comment 4",
        author: "ddamis",
        date: "2019-11-11T16:00:49.461Z",
      },
    ],
  };
  return (
    <Aux>
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
          <CommentList comments={comments} />
        </div>
        <div className="row">
          <CommentForm />
        </div>
      </div>
    </Aux>
  );
}
export default ItemDetails;
