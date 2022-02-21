import React from "react";
import { Button } from "react-bootstrap";

const Ebutton = (props) => {
    return <Button {...props}>{props.name}</Button>;
};
export default Ebutton;
