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

const DashBoard = React.lazy(() => import("./Components/DashBoard/DashBoard"));
const Payment = React.lazy(() => import("./Components/MakePayment/Payment"));
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
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <React.Suspense fallback="">
                {state.payment && (
                    <Nav justify variant="tabs" defaultActiveKey="/home">
                        <NavItem
                            path="/"
                            eventKey="linked-1"
                            link="DashBoard"
                        />
                        <NavItem
                            path="/home"
                            eventKey="linked-2"
                            link="Summary"
                        />
                        <NavItem
                            path="/home"
                            eventKey="linked-4"
                            link="Recurring"
                        />
                    </Nav>
                )}
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/payment" />} />
                        <Route
                            path="/dashboard"
                            element={<DashBoard showPayment={true} />}
                        />
                        <Route
                            path="/payment"
                            element={<Payment showPayment={false} />}
                        />
                    </Routes>
                    {state.payment && (
                        <div className={classes.add}>
                            <Avatar size="xl" color="primary">
                                <NavLink
                                    to="/payment"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    +
                                </NavLink>
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
