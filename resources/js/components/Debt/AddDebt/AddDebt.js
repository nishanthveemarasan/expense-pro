import React from "react";
import DebtBody from "../UI/DebtBody/DebtBody";
import Head from "../UI/Head/Head";

const AddDebt = (props) => {
    return (
        <>
            <div>
                <Head
                    heading={
                        props.action == "lend"
                            ? "Lend Money/Reduce Debt"
                            : "Borrow Money"
                    }
                    action={props.action}
                />
            </div>
            <main>
                <DebtBody />
            </main>
        </>
    );
};
export default AddDebt;
