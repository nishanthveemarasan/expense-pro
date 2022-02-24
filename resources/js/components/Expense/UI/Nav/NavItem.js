import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { expenseStoreAction } from "../../Store/Store";

const NavItem = (props) => {
    const dispatch = useDispatch();
    const onPageHandler = (page) => {
        dispatch(expenseStoreAction.updatePage({ page }));
    };
    return (
        <Nav.Item>
            <Nav.Link
                onClick={() => onPageHandler(props.path)}
                eventKey={props.eventKey}
                style={props.style}
            >
                {props.link}
            </Nav.Link>
        </Nav.Item>
    );
};

export default NavItem;
