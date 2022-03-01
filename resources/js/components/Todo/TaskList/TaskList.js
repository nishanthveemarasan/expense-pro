import React from "react";
import { useSelector } from "react-redux";
import classes from "./TaskList.module.css";
import TaskListItem from "./TaskListItem/TaskListItem";
const TaskList = ({ completed }) => {
    const mapStateToProps = (state) => {
        return {
            taskType: state.todoStore.taskType,
            tasks: state.todoStore.data,
        };
    };
    const state = useSelector(mapStateToProps);
    console.log(state.tasks);
    return (
        <div className={classes.main}>
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
