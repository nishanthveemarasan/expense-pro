import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import store, { expenseStoreAction } from "./Store/Store";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import {
    getInitialExpenseData,
    initialExpenseData,
} from "./Store/reducers/expense-reducer";
import ExpenseCategory from "./Components/ExpenseCategory/ExpenseCategory";
import Payment from "./Components/MakePayment/Payment";
import Category from "./Components/MakePayment/Category/Category";
import MakeRecurring from "./Components/Recurring/MakeRecurring/MakeRecurring";
import EditRecurring from "./Components/Recurring/MakeRecurring/EditRecurring";
import { SwitchTransition, Transition } from "react-transition-group";
import { defaultStyle, duration, findStyles } from "./Components/style";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import SummaryContent from "./Components/Summary/SummaryContent/SummaryContent";
import { WEB_URL } from "../Helper/Helper";
import Loading from "../Loading/Loading";

const Expense = (props) => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(getInitialExpenseData(token));
        } else {
            window.location.replace(`${WEB_URL}/auth`);
        }
    }, []);
    const mapStateToProps = (state) => {
        return {
            mainPage: state.expenseStore.mainPage,
            loadingPage: state.expenseStore.loadingPage,
        };
    };
    const states = useSelector(mapStateToProps);
    return (
        <>
            {states.loadingPage ? (
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
                                    ) : states.mainPage == "summary" ? (
                                        <SummaryContent />
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
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Expense;

if (document.getElementById("expense")) {
    // const data = document.getElementById("expense").getAttribute("data");
    // const token = document.getElementById("expense").getAttribute("token");
    ReactDOM.render(
        <Provider store={store}>
            <Expense />
        </Provider>,

        document.getElementById("expense")
    );
}
