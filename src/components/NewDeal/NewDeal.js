import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import Axios from "axios";
import {getJwt} from '../../helpers/jwt';
import {withRouter} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const NewDeal = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState(null);


  const updateTitle = e => {
    setTitle(e.target.value);
  };
  const updateDescription = e => {
    setDescription(e.target.value);
  };
  const updatePrice = e => {
    setPrice(e.target.value);
  };
  const updateOldPrice = e => {
    setOldPrice(e.target.value);
  };
  const updateImage = e =>{
    setImage(e.target.files[0]);
  };
  
  const submit = async (e) => {
    e.preventDefault();
    const jwt = getJwt();
    if(!jwt){
        this.props.history.push('/login');
    }
    const formdata = new FormData();
    const reqData = {
      title: title,
      description: description,
      price: price,
      oldPrice: oldPrice,
    };
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('price', price);
    formdata.append('oldPrice', oldPrice);
    formdata.append('image', image);

    // const reqDataJson = JSON.stringify(reqData)

    Axios.post('http://localhost:3001/api/v1/deals', formdata,  {
      headers:{
        'x-auth': jwt
      }
    }).then((res)=>{
      if(res.status==200){
        NotificationManager.success('Success', 'New deal has been added successfully');
   
        setTitle('');
        setDescription('');
        setPrice('');
        setOldPrice('');
        setImage(null)
        setTimeout(function(){ 
          props.history.push("/");
         }, 2000);
      }
      else{
        NotificationManager.warning('Warning', 'Failed to add new deal', 3000);
      }
      
  }).catch((err)=>{
    NotificationManager.warning('Warning', 'Failed to add new deal', 3000);
    console.log(err);
  })
    
  };

  return (
    
    <Aux>
      <div className="container page padding-t-60">
        <div className="row">
          <div className="col-md-6 add-deal-form">
            <form
            onSubmit={e => {
              submit(e);
            }}
            >
              <h3>Add new deal</h3>
              <div className="form-input-wrapper">
                <h4>Link</h4>
                <input
                  required
                  minLength="12"
                  type="text"
                  name="link"
                  placeholder="Paste your link here..."
                  // onChange={e => {
                  //   updateEmail(e);
                  // }}
                  // value={email}
                ></input>
                <div className="form-input-details">
                  <h4>Details</h4>
                  <h5>Title</h5>
                  <input
                    required
                    minLength="5"
                    type="text"
                    name="title"
                    placeholder="Write your title"
                    onChange={e => {
                      updateTitle(e);
                    }}
                    value={title}
                  ></input>
                  <h5>Description</h5>
                  <textarea
                    rows="4"
                    required
                    type="text"
                    name="description"
                    placeholder="Write short description about deal..."
                    onChange={e => {
                      updateDescription(e);
                    }}
                    value={description}
                  ></textarea>

                  <div className="row">
                    <div className="col-sm-6">
                      <h5>Deal price</h5>
                      <input
                        className="form-input-price"
                        required
                        minLength="1"
                        type="text"
                        name="title"
                        placeholder="Write your title"
                        onChange={e => {
                          updatePrice(e);
                        }}
                        value={price}
                      ></input>
                    </div>
                    <div className="col-sm-6">
                      <h5>Regular price</h5>
                      <input
                        className="form-input-price"
                        required
                        minLength="1"
                        type="text"
                        name="title"
                        placeholder="Write your title"
                        onChange={e => {
                          updateOldPrice(e);
                        }}
                        value={oldPrice}
                      ></input>
                    </div>
                    <input type="file" name="file" className="input-file" onChange={e => {
                      updateImage(e);
                    }}/>
                    <button type="submit" className="form-button">Add deal</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6">sfds</div>
        </div>
      </div>
      <NotificationContainer/>
    </Aux>
  );
};

// {
// 	"title": "Laptop 300gb karta HD",
// 	"description": "to jest super sprzet. Bierz go juz i tyle man",
// 	"price": "3999 zł",
// 	"oldPrice": "5000 zł",
// 	"image": "http://localhost:3001/img/1.jpg"
// }

export default withRouter(NewDeal);
