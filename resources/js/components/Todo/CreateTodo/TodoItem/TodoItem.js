import React, { useState } from "react";
import TButton from "../../UI/Button/Button";
import TextArea from "../../UI/TextArea/TextArea";
import classes from "./TodoItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFirstLetterLowerWord, uuid } from "../../../Helper/Helper";
import { todoStoreAction } from "../../../Expense/Store/Store";
const TodoItem = (props) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState("");
    const [count, setCount] = useState(1);
    const mapStateToProps = (state) => {
        return {
            item: state.todoStore.todoTask,
        };
    };
    const state = useSelector(mapStateToProps);

    const onItemChangeHandler = (event) => {
        const value = event.target.value;
        setItem(getFirstLetterLowerWord(value));
    };
    const onClearItemHandler = () => {
        setItem("");
    };

    const onAddItemToTaskHandler = () => {
        const data = {
            uuid: uuid(),
            name: item,
            order: count,
            completed: false,
        };
        dispatch(todoStoreAction.addItemToTask({ data }));
        setCount((prevState) => prevState + 1);
        setItem("");
    };
    return (
        <>
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
        </>
    );
};
export default TodoItem;
