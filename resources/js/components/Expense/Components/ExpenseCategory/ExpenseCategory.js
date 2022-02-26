import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../../Helper/Helper";
import { expenseStoreAction } from "../../Store/Store";
import Avatar from "../../UI/Avatar/Avatar";
import Head from "../../UI/head/Head";
import NavItem from "../../UI/Nav/NavItem";
import DashBoard from "../DashBoard/DashBoard";
import Category from "../MakePayment/Category/Category";
import Payment from "../MakePayment/Payment";
import classes from "./ExpenseCategory.module.css";

const ExpenseCategory = (props) => {
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
            <Head type="middle">
                <div className={classes.heading}>Expense Manager</div>
            </Head>
            <React.Suspense fallback="">
                {state.page == "dashboard" && (
                    <Nav justify variant="tabs" defaultActiveKey="dashboard">
                        <NavItem
                            path="dashboard"
                            eventKey="dashboard"
                            link="DashBoard"
                        />
                        <NavItem
                            path="summary"
                            eventKey="summary"
                            link="Summary"
                        />
                        <NavItem
                            path="recurring"
                            eventKey="recurring"
                            link="Recurring"
                        />
                    </Nav>
                )}

                <main style={{ margin: "3% 0 5% 0" }}>
                    {state.page == "dashboard" && <DashBoard />}
                    {state.page == "dashboard" && (
                        <div className={classes.add}>
                            <Avatar size="xl" color="primary" align="5">
                                <NavItem
                                    mainPage="payment"
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
export default ExpenseCategory;
