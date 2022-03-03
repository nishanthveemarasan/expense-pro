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
        };
    };
    const state = useSelector(mapStateToProps);
    useEffect(() => {
        const percentage = Math.floor((completed / total) * 100);
        if (percentage == 100 && state.showTasks != "completed") {
            dispatch(completeTaskStatus(uuid));
            setTimeout(
                () => {
                    dispatch(
                        todoStoreAction.completeToDoList({ id, value: true })
                    );
                },
                1000,
                id
            );
        }
        setPercentage(percentage);
    }, [total, completed, state.showTasks]);
    return <ProgressBar animated now={percentage} label={`${percentage}%`} />;
};
export default Progress;
