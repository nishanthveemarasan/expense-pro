import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Expense.module.css";
import { Nav } from "react-bootstrap";
import NavItem from "./UI/Nav/NavItem";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import store, { expenseStoreAction } from "./Store/Store";
import { getDate } from "../Helper/Helper";
import Avatar from "./UI/Avatar/Avatar";
import "react-datepicker/dist/react-datepicker.css";
import Head from "./UI/head/Head";

const ExpenseCategory = React.lazy(() =>
    import("./Components/ExpenseCategory/ExpenseCategory")
);
const Payment = React.lazy(() => import("./Components/MakePayment/Payment"));
const Category = React.lazy(() =>
    import("./Components/MakePayment/Category/Category")
);

const Expense = () => {
    const mapStateToProps = (state) => {
        return {
            mainPage: state.expenseStore.mainPage,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <React.Suspense fallback="">
                {state.mainPage == "expenseCategory" && <ExpenseCategory />}
                {state.mainPage == "payment" && <Payment />}
                {state.mainPage == "category" && <Category />}
            </React.Suspense>
        </>
    );
};

export default Expense;

if (document.getElementById("expense")) {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Expense />
            </Provider>
        </BrowserRouter>,
        document.getElementById("expense")
    );
}
