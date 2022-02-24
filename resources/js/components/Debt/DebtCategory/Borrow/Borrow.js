import React from "react";
import SingbleBox from "../../UI/DetailsBox/SingbleBox";
import Add from "../../UI/NavItem/AddCircle/Add";
import classes from "./Borrow.module.css";
const Borrow = (props) => {
    return (
        <>
            <SingbleBox />
            <div className={classes.add}>
                <Add />
            </div>
        </>
    );
};
export default Borrow;
