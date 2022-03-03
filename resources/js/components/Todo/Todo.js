import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import CreateTodo from "./CreateTodo/CreateTodo";
import TodoCategory from "./TodoCategory/TodoCategory";
import store, { todoStoreAction } from "../Expense/Store/Store";
import { initialTaskData } from "../Expense/Store/reducers/todo-reduce";
const Todo = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = JSON.parse(props.data);
        dispatch(initialTaskData(data));
    }, []);
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

if (document.getElementById("Todo")) {
    const data = document.getElementById("Todo").getAttribute("data");
    ReactDOM.render(
        <Provider store={store}>
            <Todo data={data} />
        </Provider>,
        document.getElementById("Todo")
    );
}
