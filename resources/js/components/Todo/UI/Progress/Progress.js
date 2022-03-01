import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { todoStoreAction } from "../../../Expense/Store/Store";
const Progress = ({ total, completed, id }) => {
    const dispatch = useDispatch();
    const [percentage, setPercentage] = useState("");
    useEffect(() => {
        const percentage = Math.floor((completed / total) * 100);
        if (percentage == 100) {
            setTimeout(
                () => {
                    dispatch(
                        todoStoreAction.completeToDoList({ id, value: true })
                    );
                },
                2000,
                id
            );
        } else {
            dispatch(todoStoreAction.completeToDoList({ id, value: false }));
        }
        setPercentage(percentage);
    }, [total, completed]);
    return <ProgressBar animated now={percentage} label={`${percentage}%`} />;
};
export default Progress;
