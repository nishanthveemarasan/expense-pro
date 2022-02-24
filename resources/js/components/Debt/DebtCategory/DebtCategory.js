import React from "react";
import { Nav } from "react-bootstrap";
import NavItem from "../UI/NavItem/NavItem";
import Lend from "./Lend/Lend";
import { useSelector } from "react-redux";
import Borrow from "./Borrow/Borrow";
import Individual from "./Individual/Individual";
const DebtCategory = (props) => {
    const mapStateToProps = (state) => {
        return {
            page: state.debtStore.page,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <NavItem path="giveto" eventKey="linked-1" link="LEND" />
                <NavItem path="borrowfrom" eventKey="linked-2" link="BORROW" />
                <NavItem
                    path="individual"
                    eventKey="linked-4"
                    link="INDIVIDUALS"
                />
            </Nav>
            <main>
                {state.page == "giveto" && <Lend />}
                {state.page == "borrowfrom" && <Borrow />}
                {state.page == "individual" && <Individual />}
            </main>
        </>
    );
};
export default DebtCategory;
