import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from "../../Expense/UI/Avatar/Avatar";
import Head from "../../Expense/UI/head/Head";
import NavItem from "../UI/Nav/NavItem";
import classes from "./SavingCategory.module.css";
import Summary from "./Summary/Summary";
import History from "./History/History";

const SavingCategory = () => {
    const mapStateToProps = (state) => {
        return {
            mainPage: state.savingStore.mainPage,
            page: state.savingStore.page,
        };
    };
    const state = useSelector(mapStateToProps);
    // console.log(state.page);
    return (
        <>
            <Head type="middle">
                <div className={classes.heading}>Saving</div>
            </Head>
            <React.Suspense fallback="">
                <Nav justify variant="tabs" defaultActiveKey={state.page}>
                    <NavItem
                        mainPage="savingCategory"
                        page="summary"
                        eventKey="summary"
                        link="summary"
                    />
                    <NavItem
                        mainPage="savingCategory"
                        page="history"
                        eventKey="history"
                        link="history"
                    />
                </Nav>

                <main className={classes.main}>
                    {state.page == "summary" && <Summary />}
                    {state.page == "history" && <History />}
                </main>
            </React.Suspense>
            <div className={classes.add}>
                <Avatar size="xl" color="primary" align="5">
                    <NavItem
                        mainPage="createSaving"
                        page={state.page}
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

export default SavingCategory;
