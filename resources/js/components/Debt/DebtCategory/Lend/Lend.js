import React from "react";
import Avatar from "../../../Expense/UI/Avatar/Avatar";
import DetailsBox from "../../UI/DetailsBox/DetailsBox";
import SingbleBox from "../../UI/DetailsBox/SingbleBox";
import Add from "../../UI/NavItem/AddCircle/Add";
import NavItem from "../../UI/NavItem/NavItem";
import classes from "./Lend.module.css";
const Lend = (props) => {
    return (
        <>
            <DetailsBox />
            {/* <SingbleBox /> */}
            <div className={classes.add}>
                <Add />
            </div>
        </>
    );
};
export default Lend;
