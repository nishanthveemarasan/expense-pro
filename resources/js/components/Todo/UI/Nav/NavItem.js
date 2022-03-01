import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { todoStoreAction } from "../../../Expense/Store/Store";

const NavItem = (props) => {
    const dispatch = useDispatch();
    const onPageHandler = (mainPage, page, taskType, showTasks) => {
        dispatch(
            todoStoreAction.updatePage({ mainPage, page, taskType, showTasks })
        );
    };
    return (
        <Nav.Item>
            <Nav.Link
                onClick={() =>
                    onPageHandler(
                        props.mainPage,
                        props.page,
                        props.taskType,
                        props.showTasks
                    )
                }
                eventKey={props.eventKey}
                style={props.style}
            >
                {props.link}
            </Nav.Link>
        </Nav.Item>
    );
};

export default NavItem;
