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
import { SwitchTransition, Transition } from "react-transition-group";
import { defaultStyle, duration, findStyles } from "./Components/style";

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
    const states = useSelector(mapStateToProps);
    // console.log(state.mainPage);
    return (
        <>
            <React.Suspense fallback="">
                <SwitchTransition>
                    <Transition key={states.mainPage} timeout={duration}>
                        {(state) => (
                            <div
                                style={{
                                    ...defaultStyle,
                                    ...findStyles(state, state.mainPage),
                                }}
                            >
                                {states.mainPage == "expenseCategory" ? (
                                    <ExpenseCategory />
                                ) : states.mainPage == "payment" ? (
                                    <Payment />
                                ) : states.mainPage == "category" ? (
                                    <Category />
                                ) : states.mainPage == "makeRecurring" ? (
                                    <MakeRecurring />
                                ) : states.mainPage == "editRecurring" ? (
                                    <EditRecurring />
                                ) : null}
                            </div>
                        )}
                    </Transition>
                </SwitchTransition>
                {/* {states.mainPage == "expenseCategory" && <ExpenseCategory />}
                {states.mainPage == "payment" && <Payment />}
                {states.mainPage == "category" && <Category />}
                {states.mainPage == "makeRecurring" && <MakeRecurring />}
                {states.mainPage == "editRecurring" && <EditRecurring />} */}
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
