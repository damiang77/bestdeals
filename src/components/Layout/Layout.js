import React from "react";
import Aux from "../../hoc/Aux";
import Toolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer";
import {Helmet} from "react-helmet";

const layout = (props) => (
  <Aux>
      <Helmet>
          <title>Best Deals!</title>
          <meta name="description" content="The Best Deals from the Internet!"/>
      </Helmet>
    <Toolbar email={props.email} />
    {props.children}
    <Footer />
  </Aux>
);

export default layout;
