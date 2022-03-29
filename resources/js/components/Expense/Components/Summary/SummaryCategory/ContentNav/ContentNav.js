import React from "react";
import { Nav } from "react-bootstrap";

const ContentNav = ({ change, page, link, eventKey }) => {
    return (
        <Nav.Item>
            <Nav.Link
                onClick={() => change(page)}
                eventKey={eventKey}
                // style={props.style}
            >
                {link}
            </Nav.Link>
        </Nav.Item>
    );
};
export default ContentNav;
