import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { expenseStoreAction } from "../../Store/Store";

const NavItem = (props) => {
    const dispatch = useDispatch();
    const onPageHandler = (mainPage, page) => {
        dispatch(expenseStoreAction.updatePage({ mainPage, page }));
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
