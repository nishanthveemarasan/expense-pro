import React from "react";
import { Nav } from "react-bootstrap";
import ContentNav from "./ContentNav";

const MainNav = ({ content, change }) => {
    return (
        <Nav justify variant="tabs" defaultActiveKey={content}>
            <ContentNav
                page="datewise"
                eventKey="datewise"
                link="Date wise"
                change={change}
            />
            <ContentNav
                page="categorywise"
                eventKey="categorywise"
                link="Category Wise"
                change={change}
            />
        </Nav>
    );
};
export default MainNav;
