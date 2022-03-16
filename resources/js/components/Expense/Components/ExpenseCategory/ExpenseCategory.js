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
import { SwitchTransition, Transition } from "react-transition-group";
import { defaultStyle, duration, opacityStyle } from "../style";

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
    const states = useSelector(mapStateToProps);
    return (
        <>
            <Head type="middle">
                <div className={classes.heading}>Expense Manager</div>
            </Head>
            <React.Suspense fallback="">
                <Nav justify variant="tabs" defaultActiveKey={states.page}>
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
                    <SwitchTransition>
                        <Transition key={states.page} timeout={duration}>
                            {(state) => (
                                <div
                                    style={{
                                        ...defaultStyle,
                                        ...opacityStyle[state],
                                    }}
                                >
                                    {states.page == "dashboard" ? (
                                        <DashBoard />
                                    ) : states.page == "summary" ? (
                                        <Summary />
                                    ) : states.page == "recurring" ? (
                                        <Recurring />
                                    ) : null}
                                </div>
                            )}
                        </Transition>
                    </SwitchTransition>
                    {/* {states.page == "dashboard" && <DashBoard />} */}
                    {/* {states.page == "summary" && (
                        <Summary show={state.page == "summary"} />
                    )} */}
                    {/* {states.page == "recurring" && <Recurring />} */}
                    {states.page == "dashboard" && (
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
