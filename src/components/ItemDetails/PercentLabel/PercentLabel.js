import React, { Fragment } from "react";

const PercentLabel = props => {

    function Percentage(price, oldPrice){
      var priceNum = parseFloat(price);
      var oldPriceNum = parseFloat(oldPrice);
       return 100 - (((priceNum * 100)/ oldPriceNum).toFixed())
    }
  return (
    <div className="precent-label">-{Percentage(props.price, props.oldPrice)}%</div>
  );
};

export default PercentLabel;
