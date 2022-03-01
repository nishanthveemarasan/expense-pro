import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoStoreAction } from "../../Expense/Store/Store";
import Head from "../../Expense/UI/head/Head";
import { getDate, getFirstLetterUpperWord, uuid } from "../../Helper/Helper";
import TButton from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./CreateTodo.module.css";
import ListTodoItems from "./ListTodoItems/ListTodoItems";
import TodoItem from "./TodoItem/TodoItem";
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
        console.log();
        dispatch(todoStoreAction.updateTaskData({ data }));
        onPageChangeHandler();
    };
    return (
        <>
            <Head type="space">
                <div className={classes.heading}>
                    <i
                        className="bi bi-arrow-left"
                        onClick={onPageChangeHandler}
                    ></i>
                </div>
                <div className={classes.heading}>
                    Add Task List - {state.taskType}
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
