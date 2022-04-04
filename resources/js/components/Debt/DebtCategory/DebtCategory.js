import React from "react";
import { Nav } from "react-bootstrap";
import NavItem from "../UI/NavItem/NavItem";
import Lend from "./Lend/Lend";
import { useSelector } from "react-redux";
import Borrow from "./Borrow/Borrow";
import Individual from "./Individual/Individual";
import Head from "./Head/Head";
const DebtCategory = (props) => {
    const mapStateToProps = (state) => {
        return {
            page: state.debtStore.page,
        };
    };
    const state = useSelector(mapStateToProps);

    return (
        <>
            <Head />
            <Nav justify variant="tabs" defaultActiveKey={state.page}>
                <NavItem
                    page="giveto"
                    type="subpage"
                    mainPage="debtcategory"
                    eventKey="giveto"
                    link="GIVE TO"
                />
                <NavItem
                    page="borrowfrom"
                    type="subpage"
                    mainPage="debtcategory"
                    eventKey="borrowfrom"
                    link="GET FROM"
                />
                <NavItem
                    page="individual"
                    mainPage="debtcategory"
                    type="subpage"
                    eventKey="individual"
                    link="INDIVIDUALS"
                />
            </Nav>
            <main style={{ padding: "2% 4%" }}>
                {state.page == "giveto" && <Lend />}
                {state.page == "borrowfrom" && <Borrow />}
                {state.page == "individual" && <Individual />}
            </main>
        </>
    );
};
export default DebtCategory;
