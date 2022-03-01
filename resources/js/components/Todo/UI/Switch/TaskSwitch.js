import React from "react";
import { useDispatch } from "react-redux";
import { todoStoreAction } from "../../../Expense/Store/Store";
import SwitchItem from "./SwitchItem";

const TaskSwitch = (props) => {
    const dispatch = useDispatch();
    const onTypeChangeHandler = (type) => {
        console.log("type", type);
        dispatch(todoStoreAction.setShowPage({ type }));
    };

    return (
        <div>
            <SwitchItem
                label="Current Tasks"
                labelClass="btn btn-outline-success"
                id="success-outlined"
                onClick={() => onTypeChangeHandler(props.current)}
                checked={true}
            />
            <SwitchItem
                label="Completed Tasks"
                labelClass="btn btn-outline-danger"
                id="danger-outlined"
                onClick={() => onTypeChangeHandler(props.completed)}
            />
        </div>
    );
};

export default TaskSwitch;
