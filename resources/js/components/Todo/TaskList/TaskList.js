import React, { useState } from "react";
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
    let count = 0;
    return (
        <>
            <div className={classes.main}>
                {state.tasks &&
                    state.tasks.map((el, i) => {
                        if (
                            el.type == state.taskType &&
                            el.completed == completed
                        ) {
                            count += 1;
                            return (
                                <TaskListItem
                                    {...el}
                                    key={i}
                                    parendId={i}
                                    completed={completed}
                                />
                            );
                        }
                    })}
            </div>
            {count == 0 && (
                <div className={classes.emptyData}>
                    {showWarning(state.taskType, state.showTasks)}
                </div>
            )}
        </>
    );
};

export default TaskList;
