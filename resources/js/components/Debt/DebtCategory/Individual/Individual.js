import React from "react";
import { useSelector } from "react-redux";
import DetailsBox from "../../UI/DetailsBox/DetailsBox";
import classes from "./Individual.module.css";
const Individual = (props) => {
    const mapStateToProps = (state) => {
        return {
            data: state.debtStore.debtData,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            {state.data.length == 0 && (
                <div className={classes.emptyData}>
                    No Individual Data at this moment
                </div>
            )}
            {state.data &&
                state.data.map((element, id) => {
                    return <DetailsBox key={id} {...element} />;
                })}
        </>
    );
};
export default Individual;
