import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../UI/Avatar/Avatar";
import NavItem from "../../UI/Nav/NavItem";
import ListItemDetails from "./ListRecurring/ListItemDetails/ListItemDetails";
import ListRecurringItem from "./ListRecurring/ListRecurringItem";
import classes from "./Recurring.module.css";
const Recurring = (props) => {
    const mapStateToProps = (state) => {
        return {
            recurringData: state.expenseStore.recurringData,
            recurringPage: state.expenseStore.recurringPage,
        };
    };
    const state = useSelector(mapStateToProps);
    // console.log(state.recurringData);
    return (
        <>
            <div style={{ padding: "3% 2%" }}>
                {state.recurringPage.page == "main" && (
                    <>
                        {state.recurringData.length == 0 && (
                            <div className={classes.emptyData}>
                                There is no Active Recurring Payment
                            </div>
                        )}
                        {state.recurringData.length > 0 &&
                            state.recurringData.map((el, i) => {
                                return <ListRecurringItem {...el} key={i} />;
                            })}
                    </>
                )}
                {state.recurringPage.page == "sub" && (
                    <>
                        <ListItemDetails {...state.recurringPage.data} />
                    </>
                )}
            </div>
            <div className={classes.add}>
                <Avatar size="xl" color="primary" align="5">
                    <NavItem
                        mainPage="recurring"
                        page="recurring"
                        link="+"
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    />
                </Avatar>
            </div>
        </>
    );
};

export default Recurring;
