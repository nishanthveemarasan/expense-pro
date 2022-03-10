import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import store, { expenseStoreAction } from "./Store/Store";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { initialExpenseData } from "./Store/reducers/expense-reducer";
import ExpenseCategory from "./Components/ExpenseCategory/ExpenseCategory";
import Payment from "./Components/MakePayment/Payment";
import Category from "./Components/MakePayment/Category/Category";
import MakeRecurring from "./Components/Recurring/MakeRecurring/MakeRecurring";
import EditRecurring from "./Components/Recurring/MakeRecurring/EditRecurring";

const Expense = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = JSON.parse(props.data);
        dispatch(initialExpenseData(data.data, props.token));
        dispatch(expenseStoreAction.calculateSummary());
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
                {state.mainPage == "makeRecurring" && <MakeRecurring />}
                {state.mainPage == "editRecurring" && <EditRecurring />}
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
    const token = document.getElementById("expense").getAttribute("token");
    ReactDOM.render(
        <Provider store={store}>
            <Expense data={data} token={token} />
        </Provider>,

        document.getElementById("expense")
    );
}
