import React from "react";
import { useDispatch } from "react-redux";
import { todoStoreAction } from "../../../Expense/Store/Store";
import InputCheck from "../../UI/Input/InputCheck";
import Progress from "../../UI/Progress/Progress";
import classes from "./TaskListItem.module.css";
const TaskListItem = (props) => {
    const dispatch = useDispatch();
    const progress = {
        total: 0,
        completed: 0,
    };
    const onCheckChangeHandler = (id) => {
        const data = {
            id,
            parentId: props.parendId,
        };
        dispatch(todoStoreAction.updateToDoList(data));
    };
    return (
        <div className={`card widget-todo ${classes.card}`}>
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                <h3>{props.title}</h3>
            </div>

            <div className="card-body px-3 py-1">
                {props.items.map((item, i) => {
                    progress.total += 1;
                    if (item.completed) {
                        progress.completed += 1;
                    }
                    return (
                        <div
                            className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-2 mt-3"
                            key={i}
                        >
                            <div className="widget-todo-title-area d-flex align-items-center">
                                <div className="checkbox checkbox-shadow">
                                    <InputCheck
                                        class="form-check-input"
                                        id={i}
                                        value={item.completed}
                                        change={onCheckChangeHandler}
                                    />
                                </div>
                                <span
                                    className="widget-todo-title ml-50"
                                    style={{ marginLeft: "5px" }}
                                >
                                    {item.name}
                                </span>
                            </div>
                            {/* <div className="widget-todo-item-action d-flex align-items-center">
                                <i
                                    className="bi bi-x-circle"
                                    style={{ color: "red" }}
                                ></i>
                            </div> */}
                        </div>
                    );
                })}
                <div className={classes.progressBar}>
                    <Progress {...progress} id={props.parendId} />
                </div>
            </div>
        </div>
    );
};
export default TaskListItem;
