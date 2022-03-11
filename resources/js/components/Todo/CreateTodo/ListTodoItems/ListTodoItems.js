import React, { useState } from "react";
import "./transition.css";
import { useDispatch, useSelector } from "react-redux";
import { todoStoreAction } from "../../../Expense/Store/Store";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ListTodoItems = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            lists: state.todoStore.todoTask.items,
        };
    };
    const state = useSelector(mapStateToProps);

    const onRemoveItemHandler = (id) => {
        dispatch(todoStoreAction.removeItemFromTask({ id }));
    };
    return (
        <>
            <TransitionGroup className="">
                {state.lists &&
                    state.lists.map((el, i) => {
                        return (
                            <CSSTransition
                                key={i}
                                timeout={500}
                                classNames="item"
                            >
                                <div
                                    className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-2"
                                    style={{
                                        marginTop: "4%",
                                        fontSize: "1rem",
                                    }}
                                >
                                    <div className="widget-todo-title-area d-flex align-items-center">
                                        <div className="checkbox checkbox-shadow">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="checkbox1"
                                            />
                                        </div>
                                        <span
                                            className="widget-todo-title ml-50"
                                            style={{ marginLeft: "8px" }}
                                        >
                                            {el.name}
                                        </span>
                                    </div>
                                    <div className="widget-todo-item-action d-flex align-items-center">
                                        <i
                                            className="bi bi-x-circle"
                                            style={{ color: "red" }}
                                            onClick={onRemoveItemHandler.bind(
                                                this,
                                                i
                                            )}
                                        ></i>
                                    </div>
                                </div>
                            </CSSTransition>
                        );
                    })}
            </TransitionGroup>
        </>
    );
};
export default ListTodoItems;
