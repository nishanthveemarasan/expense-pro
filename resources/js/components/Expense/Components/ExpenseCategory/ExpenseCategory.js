import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../../Helper/Helper";
import { expenseStoreAction } from "../../Store/Store";
import Avatar from "../../UI/Avatar/Avatar";
import Head from "../../UI/head/Head";
import NavItem from "../../UI/Nav/NavItem";
import classes from "./ExpenseCategory.module.css";
import DashBoard from "../DashBoard/DashBoard";
import Summary from "../Summary/Summary";
import Recurring from "../Recurring/Recurring";

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
                <Nav justify variant="tabs" defaultActiveKey={state.page}>
                    <NavItem
                        page="dashboard"
                        mainPage="expenseCategory"
                        eventKey="dashboard"
                        link="DashBoard"
                    />
                    <NavItem
                        page="summary"
                        mainPage="expenseCategory"
                        eventKey="summary"
                        link="Summary"
                    />
                    <NavItem
                        page="recurring"
                        mainPage="expenseCategory"
                        eventKey="recurring"
                        link="Recurring"
                    />
                </Nav>

                <main style={{ margin: "3% 2% 5% 2%" }}>
                    {state.page == "dashboard" && <DashBoard />}
                    {state.page == "summary" && <Summary />}
                    {state.page == "recurring" && <Recurring />}
                    {state.page == "dashboard" && (
                        <div className={classes.add}>
                            <Avatar size="xl" color="primary" align="5">
                                <NavItem
                                    mainPage="payment"
                                    page="dashboard"
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
