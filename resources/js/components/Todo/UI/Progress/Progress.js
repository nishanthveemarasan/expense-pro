import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { completeTaskStatus } from "../../../Expense/Store/reducers/todo-reduce";
import { todoStoreAction } from "../../../Expense/Store/Store";
const Progress = ({ total, completed, id, uuid }) => {
    const dispatch = useDispatch();
    const [percentage, setPercentage] = useState("");
    const [color, setColor] = useState("primary");
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
            setColor("success");
            dispatch(completeTaskStatus(uuid, state.token));
            dispatch(todoStoreAction.completeToDoList({ id, value: true }));
        }

        if (percentage == 100) {
            setColor("success");
        }
        setPercentage(percentage);
    }, [total, completed, state.showTasks]);
    return (
        <ProgressBar
            animated
            variant={color}
            now={percentage}
            label={`${percentage}%`}
        />
    );
};
export default Progress;
