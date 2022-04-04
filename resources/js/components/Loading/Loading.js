import React from "react";
import { Spinner } from "react-bootstrap";
import classes from "./Loading.module.css";
const Loading = (props) => {
    return (
        <div className={classes.spinner}>
            <Spinner animation="grow" size="xl" variant="danger" />
        </div>
    );
};

export default Loading;
