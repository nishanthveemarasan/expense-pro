import React from "react";
import { useSelector } from "react-redux";
import { showWarning } from "../../../Helper/Helper";
import TaskListItem from "../../TaskList/TaskListItem/TaskListItem";
import classes from "./CompletedTask.module.css";
const CompletedTask = (props) => {
    const mapStateToProps = (state) => {
        return {
            tasks: state.todoStore.data,
            mainPage: state.todoStore.mainPage,
            page: state.todoStore.page,
            taskType: state.todoStore.taskType,
            showTasks: state.todoStore.showTasks,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <div className={classes.main}>
                {state.tasks.length == 0 && (
                    <div className={classes.emptyData}>
                        {showWarning(state.taskType, state.showTasks)}
                    </div>
                )}
                {state.tasks &&
                    state.tasks.map((el, i) => {
                        if (el.completed) {
                            return (
                                <TaskListItem {...el} key={i} parendId={i} />
                            );
                        }
                    })}
            </div>
        </>
    );
};
export default CompletedTask;
