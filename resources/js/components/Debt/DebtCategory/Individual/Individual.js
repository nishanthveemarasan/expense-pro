import React from "react";
import DetailsBox from "../../UI/DetailsBox/DetailsBox";
import Add from "../../UI/NavItem/AddCircle/Add";
import classes from "./Individual.module.css";
const Individual = (props) => {
    return (
        <>
            <DetailsBox />
            <div className={classes.add}>
                <Add />
            </div>
        </>
    );
};
export default Individual;
