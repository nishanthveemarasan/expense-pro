import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import CreateTodo from "./CreateTodo/CreateTodo";
import TodoCategory from "./TodoCategory/TodoCategory";
import store from "../Expense/Store/Store";
const Todo = (props) => {
    const mapStateToProps = (state) => {
        return {
            mainPage: state.todoStore.mainPage,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <React.Suspense fallback="">
                {state.mainPage == "todoCategory" && <TodoCategory />}
                {state.mainPage == "createTodo" && <CreateTodo />}
            </React.Suspense>
        </>
    );
};
export default Todo;

if (document.getElementById("todo")) {
    ReactDOM.render(
        <Provider store={store}>
            <Todo />
        </Provider>,
        document.getElementById("todo")
    );
}
