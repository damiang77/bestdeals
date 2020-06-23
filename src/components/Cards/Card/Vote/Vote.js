import React, { useState } from "react";
import Axios from "axios";
import { getJwt } from "../../../../helpers/jwt";
import {withRouter} from 'react-router-dom';
import Aux from '../../../../hoc/Aux';

const Vote = props => {
  const parsed = JSON.parse(props.item.vote)
  const [backButton, setBackButton] = useState(parsed);

  const addVote = (vote) => {
    const jwt = getJwt();
    if (!jwt) {
     props.history.push("/login");
    }
    Axios.patch(`https://gar.ovh/bd/api/v1/deals/${props.item._id}/vote`, {"vote": vote},
      {
        headers:{
          'Content-Type': 'application/json',
          'x-auth': jwt
        }
      }).then(res => {
        if (res.status === 200) {
          setBackButton(true);
          props.change(parseInt(vote));
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const removeVote = async () => {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push("/login");
    }
    Axios.patch(
      `https://gar.ovh/bd/api/v1/deals/${props.item._id}/removevote`, null,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth": jwt
        }
      }
    )
      .then(res => {
        if (res.status === 200) {
          setBackButton(false);
          if(res.data=== '-1' || res.data === '1'){
            props.change(parseInt(-res.data));
          }
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Aux>
      { backButton ? <div className="vote-back" onClick={()=>removeVote()}>back</div>
      :
        <Aux><button
        className="vote-plus"
        onClick={()=>addVote(1)}
      >
        +
      </button>
      <button
        className="vote-minus"
        onClick={()=>addVote(-1)}
      >
        -
      </button></Aux> 
      
      }
    </Aux>
  );
};

export default withRouter(Vote);
