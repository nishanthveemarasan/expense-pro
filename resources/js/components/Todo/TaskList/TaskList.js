import React from "react";
import { useSelector } from "react-redux";
import { showWarning } from "../../Helper/Helper";
import classes from "./TaskList.module.css";
import TaskListItem from "./TaskListItem/TaskListItem";
const TaskList = ({ completed }) => {
    const mapStateToProps = (state) => {
        return {
            taskType: state.todoStore.taskType,
            tasks: state.todoStore.data,
            showTasks: state.todoStore.showTasks,
            page: state.todoStore.page,
        };
    };
    const state = useSelector(mapStateToProps);
    // console.log(state.page);
    return (
        <div className={classes.main}>
            {state.tasks.length == 0 && (
                <div className={classes.emptyData}>
                    {showWarning(state.taskType, state.showTasks)}
                </div>
            )}

            {state.tasks &&
                state.tasks.map((el, i) => {
                    if (
                        el.type == state.taskType &&
                        el.completed == completed
                    ) {
                        return <TaskListItem {...el} key={i} parendId={i} />;
                    }
                })}
        </div>
    );
};

export default TaskList;
