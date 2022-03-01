import React from "react";
import { useSelector } from "react-redux";
import TaskListItem from "../../TaskList/TaskListItem/TaskListItem";
import classes from "./CompletedTask.module.css";
const CompletedTask = (props) => {
    const mapStateToProps = (state) => {
        return {
            tasks: state.todoStore.data,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <div className={classes.main}>
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
