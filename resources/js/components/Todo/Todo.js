import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import CreateTodo from "./CreateTodo/CreateTodo";
import TodoCategory from "./TodoCategory/TodoCategory";
import store, { todoStoreAction } from "../Expense/Store/Store";
import { getInitialTodoData } from "../Expense/Store/reducers/todo-reduce";
import Loading from "../Loading/Loading";
import { WEB_URL } from "../Helper/Helper";
const Todo = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(getInitialTodoData(token));
        } else {
            window.location.replace(`${WEB_URL}/auth`);
        }
    }, []);
    const mapStateToProps = (state) => {
        return {
            mainPage: state.todoStore.mainPage,
            loadingPage: state.expenseStore.loadingPage,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            {state.loadingPage ? (
                <React.Suspense fallback="">
                    {state.mainPage == "todoCategory" && <TodoCategory />}
                    {state.mainPage == "createTodo" && <CreateTodo />}
                </React.Suspense>
            ) : (
                <Loading />
            )}
        </>
    );
};
export default Todo;

if (document.getElementById("Todo")) {
    ReactDOM.render(
        <Provider store={store}>
            <Todo />
        </Provider>,
        document.getElementById("Todo")
    );
}
