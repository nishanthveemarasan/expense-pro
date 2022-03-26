import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTaskItemExistTask,
    deleteTaskItemFromTask,
    UpdateTaskItemContent,
    updateTaskItemsOrder,
    updateTaskStatus,
} from "../../../Expense/Store/reducers/todo-reduce";
import {
    expenseStoreAction,
    todoStoreAction,
} from "../../../Expense/Store/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import InputCheck from "../../UI/Input/InputCheck";
import Progress from "../../UI/Progress/Progress";
import classes from "./TaskListItem.module.css";
import TextArea from "../../UI/TextArea/TextArea";
import TButton from "../../UI/Button/Button";
import { uuid } from "../../../Helper/Helper";
import "./Transition.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Action from "./Action/Action";
import Modal from "../../../Modal/Modal";
import DeleteModal from "../../../DeleteModal/DeleteModal";
let upTImer;
let downTimer;
const TaskListItem = (props) => {
    const [showBox, setShowBox] = useState(false);
    const [item, setItem] = useState("");
    const [editType, setEditType] = useState("view");
    const [editItemContent, setEditItemContent] = useState("");
    const [cIndex, setCIndex] = useState(-1);
    const dispatch = useDispatch();
    const progress = {
        total: 0,
        completed: 0,
    };
    const mapStateToProps = (state) => {
        return {
            token: state.todoStore.appToken,
            deleteModalData: state.expenseStore.deleteModal.data,
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

    const onEditItemChangeHandler = (e) => {
        const value = e.target.value;
        setEditItemContent(value);
    };

    const onClearItemHandler = () => {
        setItem("");
        setShowBox((prevState) => !prevState);
    };

    const onClearEditItemHandler = () => {
        setEditType("view");
        setEditItemContent("");
    };
    const onAddItemToTaskHandler = () => {
        const data = {
            uuid: uuid(),
            name: item,
            order: props.items.length + 1,
            completed: false,
        };

        dispatch(
            addTaskItemExistTask(props.uuid, props.parendId, data, state.token)
        );
        setItem("");
    };

    const onMoveItemHandler = (index, type) => {
        let copyArray = props.items.slice();

        clearTimeout(upTImer);
        clearTimeout(downTimer);
        if (type === "up") {
            [copyArray[index - 1], copyArray[index]] = [
                copyArray[index],
                copyArray[index - 1],
            ];
            copyArray[index - 1] = {
                ...copyArray[index - 1],
                order: copyArray[index - 1].order - 1,
            };
            copyArray[index] = {
                ...copyArray[index],
                order: copyArray[index].order + 1,
            };
            const update = {
                id: props.parendId,
                items: copyArray,
            };
            dispatch(todoStoreAction.updateTaskItemsArray(update));
            setCIndex(index - 1);

            const obj = {
                uuid: props.parentUuid,
                data: [
                    {
                        uuid: copyArray[index - 1].uuid,
                        order: copyArray[index - 1].order,
                    },
                    {
                        uuid: copyArray[index].uuid,
                        order: copyArray[index].order,
                    },
                ],
                token: state.token,
            };

            upTImer = setTimeout(() => {
                dispatch(updateTaskItemsOrder(obj));
            }, 1000);
        }

        if (type === "down") {
            [copyArray[index + 1], copyArray[index]] = [
                copyArray[index],
                copyArray[index + 1],
            ];
            copyArray[index + 1] = {
                ...copyArray[index + 1],
                order: copyArray[index + 1].order + 1,
            };
            copyArray[index] = {
                ...copyArray[index],
                order: copyArray[index].order - 1,
            };
            const update = {
                id: props.parendId,
                items: copyArray,
            };
            dispatch(todoStoreAction.updateTaskItemsArray(update));

            const obj = {
                uuid: props.parentUuid,
                data: [
                    {
                        uuid: copyArray[index + 1].uuid,
                        order: copyArray[index + 1].order,
                    },
                    {
                        uuid: copyArray[index].uuid,
                        order: copyArray[index].order,
                    },
                ],
                token: state.token,
            };
            downTimer = setTimeout(() => {
                dispatch(updateTaskItemsOrder(obj));
            }, 1000);

            setCIndex(index + 1);
        }
    };

    const updateCurrentIndex = (index) => {
        setCIndex(index == cIndex ? -1 : index);
    };

    const onDeleteItemHandler = (index) => {
        let copyArray = props.items.slice();
        const item = copyArray[index];
        const data = {
            pUuid: props.parentUuid,
            cUuid: item.uuid,
            token: state.token,
        };
        copyArray.splice(index, 1);

        dispatch(
            todoStoreAction.updateTaskItemsArray({
                id: props.parendId,
                items: copyArray,
            })
        );
        dispatch(deleteTaskItemFromTask(data));
    };

    const onEditItemHandler = (index, content) => {
        setEditType("edit");
        setEditItemContent(content);
    };

    const onUpdateEditTaskItemHandler = () => {
        let copyArray = props.items.slice();
        const item = copyArray[cIndex];
        const data = {
            pUuid: props.parentUuid,
            cUuid: item.uuid,
            content: editItemContent,
            token: state.token,
        };
        dispatch(UpdateTaskItemContent(data));

        copyArray[cIndex] = {
            ...copyArray[cIndex],
            name: editItemContent,
        };

        dispatch(
            todoStoreAction.updateTaskItemsArray({
                id: props.parendId,
                items: copyArray,
            })
        );
        setEditType("view");
        setEditItemContent("");
    };

    const onOpenDeleteModal = () => {
        const data = {
            id: props.parendId,
            uuid: props.parentUuid,
        };
        dispatch(
            expenseStoreAction.onDeleteModal({
                heading: "Confirm your Action",
                body: "Please confirm that you are going to delete this Todo List",
                open: true,
                data,
            })
        );
    };

    const onDeleteActionHandler = () => {
        // console.log(state.deleteModalData);

        dispatch(
            todoStoreAction.updateTaskArray({
                id: state.deleteModalData.id,
            })
        );
        dispatch(
            expenseStoreAction.onDeleteModal({
                heading: " ",
                body: "",
                open: false,
                data: {},
            })
        );
    };

    return (
        <>
            <Modal />
            <DeleteModal confirm={onDeleteActionHandler} />
            <div className={`card widget-todo ${classes.card}`}>
                <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                    <h4>{props.title}</h4>
                    <div>
                        {!props.completed && (
                            <div className={classes.icons}>
                                <div className={classes.addIcon}>
                                    <FontAwesomeIcon
                                        icon={faPlusSquare}
                                        className={classes.icon}
                                        onClick={onChangeBoxHandler}
                                    />
                                </div>
                                <div className={classes.addIcon}>
                                    <FontAwesomeIcon
                                        icon={faWindowClose}
                                        className={classes.iconClose}
                                        onClick={onOpenDeleteModal}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card-body px-3 py-1">
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
                                    {cIndex == i && editType == "edit" ? (
                                        <div className={classes.editTodoItem}>
                                            <TextArea
                                                value={editItemContent}
                                                change={onEditItemChangeHandler}
                                            />
                                            <div className={classes.action}>
                                                <TButton
                                                    className="btn btn-primary rounded-pill"
                                                    name="Update"
                                                    onClick={
                                                        onUpdateEditTaskItemHandler
                                                    }
                                                />
                                                <div
                                                    className={
                                                        classes.closeButton
                                                    }
                                                    onClick={
                                                        onClearEditItemHandler
                                                    }
                                                >
                                                    x
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={classes.parent}>
                                            <div
                                                className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-2 mt-3"
                                                style={{
                                                    marginTop: "4%",
                                                    fontSize: "1rem",
                                                }}
                                                onClick={() =>
                                                    updateCurrentIndex(i)
                                                }
                                            >
                                                <div className="widget-todo-title-area d-flex align-items-center">
                                                    <div className="checkbox checkbox-shadow">
                                                        <InputCheck
                                                            class="form-check-input"
                                                            id={i}
                                                            uuid={item.uuid}
                                                            value={
                                                                item.completed
                                                            }
                                                            change={
                                                                onCheckChangeHandler
                                                            }
                                                        />
                                                    </div>
                                                    <span
                                                        style={{
                                                            marginLeft: "8px",
                                                        }}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={classes.actions}
                                                style={{
                                                    display:
                                                        cIndex == i
                                                            ? "block"
                                                            : "none",
                                                }}
                                            >
                                                {editType == "view" && (
                                                    <Action
                                                        curIndex={i}
                                                        content={item.name}
                                                        length={
                                                            props.items.length
                                                        }
                                                        moveItem={
                                                            onMoveItemHandler
                                                        }
                                                        deleteItem={
                                                            onDeleteItemHandler
                                                        }
                                                        editItem={
                                                            onEditItemHandler
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                    {showBox && (
                        <div className={classes.todoItem}>
                            <TextArea
                                value={item}
                                change={onItemChangeHandler}
                            />
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
        </>
    );
};
export default TaskListItem;
