import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { debtStoreAction } from "../../../Expense/Store/Store";

const NavItem = (props) => {
    const dispatch = useDispatch();
    const onPageHandler = (page, mainPage, type, action = "", create = "") => {
        const formData = {
            name: "",
            amount: "",
            description: "",
            date: "",
            id: null,
        };
        dispatch(debtStoreAction.createFormData({ formData }));
        dispatch(
            debtStoreAction.updatePage({ page, mainPage, type, action, create })
        );
    };
    return (
        <Nav.Item>
            <Nav.Link
                onClick={() =>
                    onPageHandler(
                        props.page,
                        props.mainPage,
                        props.type,
                        props.action,
                        props.create
                    )
                }
                eventKey={props.eventKey}
                style={props.style}
                aria-selected={true}
            >
                {props.link}
            </Nav.Link>
        </Nav.Item>
    );
};

export default NavItem;
