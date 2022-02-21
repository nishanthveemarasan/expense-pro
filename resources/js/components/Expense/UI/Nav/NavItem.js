import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavItem = (props) => {
    const navigate = useNavigate();
    const onPageHandler = (path) => {
        navigate(path);
    };
    return (
        <Nav.Item>
            <Nav.Link
                onClick={() => onPageHandler(props.path)}
                eventKey={props.eventKey}
            >
                {props.link}
            </Nav.Link>
        </Nav.Item>
    );
};

export default NavItem;
