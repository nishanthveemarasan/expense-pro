import React from "react";
import { useSelector } from "react-redux";
import { SwitchTransition, Transition } from "react-transition-group";
import Avatar from "../../UI/Avatar/Avatar";
import NavItem from "../../UI/Nav/NavItem";
import { defaultStyle, duration, findStyles } from "../style";
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
    const states = useSelector(mapStateToProps);
    // console.log(state.recurringData);
    return (
        <>
            <div style={{ padding: "3% 2%" }}>
                <SwitchTransition>
                    <Transition
                        key={states.recurringPage.page}
                        timeout={duration}
                    >
                        {(state) => (
                            <div
                                style={{
                                    ...defaultStyle,
                                    ...findStyles(state),
                                }}
                            >
                                {states.recurringPage.page == "main" ? (
                                    <>
                                        {states.recurringData.length == 0 && (
                                            <div className={classes.emptyData}>
                                                There is no Active Recurring
                                                Payment
                                            </div>
                                        )}
                                        {states.recurringData.length > 0 &&
                                            states.recurringData.map(
                                                (el, i) => {
                                                    return (
                                                        <ListRecurringItem
                                                            {...el}
                                                            key={i}
                                                        />
                                                    );
                                                }
                                            )}
                                    </>
                                ) : states.recurringPage.page == "sub" ? (
                                    <>
                                        <ListItemDetails
                                            {...states.recurringPage.data}
                                        />
                                    </>
                                ) : null}
                            </div>
                        )}
                    </Transition>
                </SwitchTransition>
                {/* {states.recurringPage.page == "main" && (
                    <>
                        {states.recurringData.length == 0 && (
                            <div className={classes.emptyData}>
                                There is no Active Recurring Payment
                            </div>
                        )}
                        {states.recurringData.length > 0 &&
                            states.recurringData.map((el, i) => {
                                return <ListRecurringItem {...el} key={i} />;
                            })}
                    </>
                )}
                {states.recurringPage.page == "sub" && (
                    <>
                        <ListItemDetails {...states.recurringPage.data} />
                    </>
                )} */}
            </div>
            <div className={classes.add}>
                <Avatar size="xl" color="primary" align="5">
                    <NavItem
                        mainPage="makeRecurring"
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
