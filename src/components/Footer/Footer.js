import React from "react";

const Footer = (props) => {

    const footerStyle  = {
        width: "100%",
        height: "50px",
        background: "#fff",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
       borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        fontSize: "10px"
    }
    const linkStyle={
        paddingLeft: "5px"
    }
    return(
        <div style={footerStyle} className="container">
            Developed by <a href="https://damiangarbera.pl" style={linkStyle}> Damian Garbera</a>
        </div>
    )
}

export default Footer;