import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from "../../Expense/UI/Avatar/Avatar";
import Head from "../../Expense/UI/head/Head";
import NavItem from "../UI/Nav/NavItem";
import CompletedTask from "./Completed/CompletedTask";
import Personal from "./Personal/Personal";
import classes from "./TodoCategory.module.css";
import Work from "./Work/Work";

const TodoCategory = (props) => {
    const mapStateToProps = (state) => {
        return {
            mainPage: state.todoStore.mainPage,
            page: state.todoStore.page,
            taskType: state.todoStore.taskType,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <Head type="middle">
                <div className={classes.heading}>Todo Manger</div>
            </Head>
            <React.Suspense fallback="">
                <Nav justify variant="tabs" defaultActiveKey={state.page}>
                    <NavItem
                        mainPage="todoCategory"
                        page="work"
                        showTasks="current"
                        taskType="work"
                        eventKey="work"
                        link="Work"
                    />
                    <NavItem
                        mainPage="todoCategory"
                        showTasks="current"
                        taskType="personal"
                        page="personal"
                        eventKey="personal"
                        link="Personal"
                    />
                    <NavItem
                        mainPage="todoCategory"
                        page="completed"
                        taskType="completed"
                        eventKey="completed"
                        link="Completed"
                    />
                </Nav>
            </React.Suspense>
            <main className={classes.main}>
                {state.page == "work" && <Work />}
                {state.page == "personal" && <Personal />}
                {state.page == "completed" && <CompletedTask />}
            </main>
            {state.page != "completed" && (
                <div className={classes.add}>
                    <Avatar size="xl" color="primary" align="5">
                        <NavItem
                            mainPage="createTodo"
                            page=""
                            taskType={state.taskType}
                            showTasks=""
                            link="+"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        />
                    </Avatar>
                </div>
            )}
        </>
    );
};
export default TodoCategory;
