import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { completeTaskStatus } from "../../../Expense/Store/reducers/todo-reduce";
import { todoStoreAction } from "../../../Expense/Store/Store";
const Progress = ({ total, completed, id, uuid }) => {
    const dispatch = useDispatch();
    const [percentage, setPercentage] = useState("");
    const mapStateToProps = (state) => {
        return {
            showTasks: state.todoStore.showTasks,
            token: state.todoStore.appToken,
        };
    };
    const state = useSelector(mapStateToProps);
    useEffect(() => {
        // console.log(total, completed);
        const percentage = Math.floor((completed / total) * 100);
        if (percentage == 100 && state.showTasks != "completed") {
            // console.log("its hear");
            dispatch(completeTaskStatus(uuid, state.token));
            dispatch(todoStoreAction.completeToDoList({ id, value: true }));
        }
        setPercentage(percentage);
    }, [total, completed, state.showTasks]);
    return <ProgressBar animated now={percentage} label={`${percentage}%`} />;
};
export default Progress;
