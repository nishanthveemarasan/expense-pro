import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savingStoreAction } from "../../../Expense/Store/Store";

const NavItem = (props) => {
    const dispatch = useDispatch();
    const onPageHandler = (mainPage, page) => {
        dispatch(savingStoreAction.updatePage({ mainPage, page }));
    };
    return (
        <Nav.Item>
            <Nav.Link
                onClick={() => onPageHandler(props.mainPage, props.page)}
                eventKey={props.eventKey}
                style={props.style}
            >
                {props.link}
            </Nav.Link>
        </Nav.Item>
    );
};

export default NavItem;
