import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTaskItemExistTask,
    updateTaskStatus,
} from "../../../Expense/Store/reducers/todo-reduce";
import { todoStoreAction } from "../../../Expense/Store/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import InputCheck from "../../UI/Input/InputCheck";
import Progress from "../../UI/Progress/Progress";
import classes from "./TaskListItem.module.css";
import TextArea from "../../UI/TextArea/TextArea";
import TButton from "../../UI/Button/Button";
import { uuid } from "../../../Helper/Helper";
import "./Transition.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskListItem = (props) => {
    const [showBox, setShowBox] = useState(false);
    const [item, setItem] = useState("");
    const dispatch = useDispatch();
    const progress = {
        total: 0,
        completed: 0,
    };
    const mapStateToProps = (state) => {
        return {
            token: state.todoStore.appToken,
        };
    };
    const state = useSelector(mapStateToProps);
    const onCheckChangeHandler = (id, value, uuid) => {
        const data = {
            id,
            parentId: props.parendId,
            value: !value,
        };
        const backend = {
            childUuid: uuid,
            completed: !value,
            parentUuid: props.uuid,
        };

        dispatch(updateTaskStatus(backend, state.token));
        dispatch(todoStoreAction.updateToDoList(data));
    };
    const onChangeBoxHandler = () => {
        setShowBox((prevState) => !prevState);
        setItem("");
    };

    const onItemChangeHandler = (e) => {
        const value = e.target.value;
        setItem(value);
    };

    const onClearItemHandler = () => {
        setItem("");
        setShowBox((prevState) => !prevState);
    };
    const onAddItemToTaskHandler = () => {
        const data = {
            uuid: uuid(),
            name: item,
            completed: false,
        };
        // console.log(data, props.uuid);
        dispatch(
            addTaskItemExistTask(props.uuid, props.parendId, data, state.token)
        );
        setItem("");
    };

    return (
        <div className={`card widget-todo ${classes.card}`}>
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                <h3>{props.title}</h3>
            </div>

            <div className="card-body px-3 py-1">
                {!props.completed && (
                    <div className={classes.addIcon}>
                        <FontAwesomeIcon
                            icon={faPlusSquare}
                            className={classes.icon}
                            onClick={onChangeBoxHandler}
                        />
                    </div>
                )}
                <TransitionGroup>
                    {props.items.map((item, i) => {
                        progress.total += 1;
                        if (item.completed != "0") {
                            progress.completed += 1;
                        }
                        return (
                            <CSSTransition
                                key={i}
                                timeout={500}
                                classNames="item"
                            >
                                <div
                                    className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-2 mt-3"
                                    style={{
                                        marginTop: "4%",
                                        fontSize: "1rem",
                                    }}
                                >
                                    <div className="widget-todo-title-area d-flex align-items-center">
                                        <div className="checkbox checkbox-shadow">
                                            <InputCheck
                                                class="form-check-input"
                                                id={i}
                                                uuid={item.uuid}
                                                value={item.completed}
                                                change={onCheckChangeHandler}
                                            />
                                        </div>
                                        <span
                                            className="widget-todo-title"
                                            style={{ marginLeft: "8px" }}
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
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
                {showBox && (
                    <div className={classes.todoItem}>
                        <TextArea value={item} change={onItemChangeHandler} />
                        <div className={classes.action}>
                            <TButton
                                className="btn btn-primary rounded-pill"
                                name="Add"
                                onClick={onAddItemToTaskHandler}
                            />
                            <div
                                className={classes.closeButton}
                                onClick={onClearItemHandler}
                            >
                                x
                            </div>
                        </div>
                    </div>
                )}
                <div className={classes.progressBar}>
                    <Progress
                        {...progress}
                        id={props.parendId}
                        uuid={props.uuid}
                    />
                </div>
            </div>
        </div>
    );
};
export default TaskListItem;
