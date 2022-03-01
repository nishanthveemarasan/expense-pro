import React from "react";
import { useSelector } from "react-redux";
import TaskList from "../../TaskList/TaskList";
import TaskSwitch from "../../UI/Switch/TaskSwitch";
import classes from "./Personal.module.css";
const Personal = (props) => {
    const mapStateToProps = (state) => {
        return {
            mainPage: state.todoStore.mainPage,
            page: state.todoStore.page,
            taskType: state.todoStore.taskType,
            showTasks: state.todoStore.showTasks,
        };
    };
    const state = useSelector(mapStateToProps);
    // console.log(state.showTasks, state.mainPage, state.page, state.taskType);
    return (
        <>
            <div className={classes.switch}>
                <TaskSwitch current="current" completed="completed" />
            </div>
            <div>
                {state.showTasks == "current" && <TaskList completed={false} />}
                {state.showTasks == "completed" && (
                    <TaskList completed={true} />
                )}
            </div>
        </>
    );
};
export default Personal;
