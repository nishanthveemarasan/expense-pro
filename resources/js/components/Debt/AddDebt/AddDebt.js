import React from "react";
import DebtBody from "../UI/DebtBody/DebtBody";
import Head from "../UI/Head/Head";
import SModel from "../UI/Model/SModel";

const AddDebt = (props) => {
    return (
        <>
            <SModel />
            <div>
                <Head
                    heading={
                        props.action == "lend"
                            ? "Lend Money/Reduce Debt"
                            : "Borrow Money/get lent money"
                    }
                    action={props.action}
                />
            </div>
            <main style={{ padding: "0 5%" }}>
                <DebtBody />
            </main>
        </>
    );
};
export default AddDebt;
