import React from "react";

import "./Backdrop.css";

const Backdrop = (props) => {
    const css = ["Backdrop", props.show ? "BackdropOpen" : "BackdropClose"];
    return <div className={css.join(" ")}></div>;
};

export default Backdrop;
