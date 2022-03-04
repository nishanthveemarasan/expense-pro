import React from "react";
import { useSelector } from "react-redux";
import classes from "./History.module.css";
import ShowSingleBox from "./showSingleBox/ShowSingleBox";
const History = (props) => {
    const mapStateToProps = (state) => {
        return {
            data: state.savingStore.data,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <div className={classes.main}>
            {state.data.length == 0 && (
                <div className={classes.emptyData}>
                    {"There is no Saving Yet!!"}
                </div>
            )}
            {state.data.length > 0 &&
                state.data.map((el, i) => <ShowSingleBox {...el} key={i} />)}
        </div>
    );
};

export default History;
