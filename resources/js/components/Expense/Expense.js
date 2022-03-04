import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Expense.module.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import store, { expenseStoreAction } from "./Store/Store";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { initialExpenseData } from "./Store/reducers/expense-reducer";
const ExpenseCategory = React.lazy(() =>
    import("./Components/ExpenseCategory/ExpenseCategory")
);
const Payment = React.lazy(() => import("./Components/MakePayment/Payment"));
const Category = React.lazy(() =>
    import("./Components/MakePayment/Category/Category")
);

const Expense = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = JSON.parse(props.data);
        dispatch(initialExpenseData(data.data));
    }, []);
    const mapStateToProps = (state) => {
        return {
            mainPage: state.expenseStore.mainPage,
        };
    };
    const state = useSelector(mapStateToProps);
    // console.log(state.mainPage);
    return (
        <>
            <React.Suspense fallback="">
                {state.mainPage == "expenseCategory" && <ExpenseCategory />}
                {state.mainPage == "payment" && <Payment />}
                {state.mainPage == "category" && <Category />}
            </React.Suspense>
            {/* <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> */}
        </>
    );
};

export default Expense;

if (document.getElementById("expense")) {
    const data = document.getElementById("expense").getAttribute("data");
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Expense data={data} />
            </Provider>
        </BrowserRouter>,
        document.getElementById("expense")
    );
}
