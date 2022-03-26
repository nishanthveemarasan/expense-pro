import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../../Expense/Store/reducers/todo-reduce";
import { expenseStoreAction, todoStoreAction } from "../../Expense/Store/Store";
import Head from "../../Expense/UI/head/Head";
import { getDate, getFirstLetterUpperWord, uuid } from "../../Helper/Helper";
import TButton from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import SModel from "../UI/Model/SModel";
import classes from "./CreateTodo.module.css";
import ListTodoItems from "./ListTodoItems/ListTodoItems";
import TodoItem from "./TodoItem/TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Modal/Modal";
const CreateTodo = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            title: state.todoStore.todoTask.title,
            task: state.todoStore.todoTask,
            taskType: state.todoStore.taskType,
            data: state.todoStore.data,
            mainPage: state.todoStore.mainPage,
            page: state.todoStore.page,
            showTasks: state.todoStore.showTasks,
            token: state.todoStore.appToken,
        };
    };
    const state = useSelector(mapStateToProps);
    const onPageChangeHandler = () => {
        const data = {
            page: state.taskType,
            mainPage: "todoCategory",
            taskType: state.taskType,
            showTasks: "current",
        };
        dispatch(todoStoreAction.updatePage(data));
        dispatch(todoStoreAction.emptyTodoTask());
    };
    const onTitleChangeHandler = (event) => {
        const title = getFirstLetterUpperWord(event.target.value);
        dispatch(todoStoreAction.updateTodoTitle({ title }));
    };

    const onAddTaskHandler = () => {
        const date = getDate().today.date;
        const data = {
            ...state.task,
            type: state.taskType,
            date,
            uuid: uuid(),
        };
        if (data.title === "") {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Please Add a Title to a Task",
                })
            );
            return;
        }
        if (data.items.length == 0) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Please Add at least one sub task",
                })
            );
            return;
        }
        const refresh = {
            page: state.taskType,
            mainPage: "todoCategory",
            taskType: state.taskType,
            showTasks: "current",
        };
        dispatch(todoStoreAction.showModel());
        dispatch(addNewTask(data, refresh, state.token));
    };
    return (
        <>
            <Modal />
            <SModel />
            <Head type="space">
                <div className={classes.heading}>
                    Add Task List - {state.taskType}
                </div>
                <div className={classes.heading}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={classes.icon}
                        onClick={onPageChangeHandler}
                    />
                </div>
            </Head>

            <div className={`card widget-todo ${classes.card}`}>
                <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                    <Input
                        border={false}
                        placeholder="Add the title of this task"
                        value={state.title}
                        change={onTitleChangeHandler}
                    />
                </div>
                <div className="card-body px-3 py-1">
                    <ListTodoItems />
                    <TodoItem />
                </div>
            </div>
            <div className={classes.createButton}>
                <TButton
                    name="Create Task"
                    className="btn btn-danger"
                    onClick={onAddTaskHandler}
                />
            </div>
        </>
    );
};
export default CreateTodo;
