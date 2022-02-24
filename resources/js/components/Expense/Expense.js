import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Expense.module.css";
import { Nav } from "react-bootstrap";
import NavItem from "./UI/Nav/NavItem";
import {
    BrowserRouter,
    Navigate,
    NavLink,
    Route,
    Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import store, { expenseStoreAction } from "./Store/Store";
import { getDate } from "../Helper/Helper";
import Avatar from "./UI/Avatar/Avatar";
import "react-datepicker/dist/react-datepicker.css";

const DashBoard = React.lazy(() => import("./Components/DashBoard/DashBoard"));
const Payment = React.lazy(() => import("./Components/MakePayment/Payment"));
const Category = React.lazy(() =>
    import("./Components/MakePayment/Category/Category")
);

const Expense = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const dateGroup = getDate();
        dispatch(expenseStoreAction.setDate({ dateGroup }));
    }, []);
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.data,
            payment: state.expenseStore.data.showPayment,
            page: state.expenseStore.page,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <React.Suspense fallback="">
                {state.page == "dashboard" && (
                    <Nav justify variant="tabs" defaultActiveKey="/home">
                        <NavItem
                            path="dashboard"
                            eventKey="linked-1"
                            link="DashBoard"
                        />
                        <NavItem
                            path="summary"
                            eventKey="linked-2"
                            link="Summary"
                        />
                        <NavItem
                            path="recurring"
                            eventKey="linked-4"
                            link="Recurring"
                        />
                    </Nav>
                )}

                <main>
                    {state.page == "dashboard" && <DashBoard />}
                    {state.page == "payment" && <Payment />}
                    {state.page == "category" && <Category />}
                    {state.page == "dashboard" && (
                        <div className={classes.add}>
                            <Avatar size="xl" color="primary" align="5">
                                <NavItem
                                    path="payment"
                                    link="+"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                />
                            </Avatar>
                        </div>
                    )}
                </main>
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
