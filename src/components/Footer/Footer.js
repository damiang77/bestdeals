import React from "react";

const Footer = (props) => {

    const footerStyle  = {
        width: "100%",
        height: "50px",
        background: "#fff",
        boxShadow: "0px 3px 30px rgba(0, 0, 0, 0.2)",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        fontSize: "10px"
    }

    return(
        <div style={footerStyle} className="container">
            Developed by Damian Garbera
        </div>
    )
}

export default Footer;