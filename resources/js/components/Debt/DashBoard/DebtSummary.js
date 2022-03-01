import React from "react";

const DebtSummary = ({ css, balance }) => {
    return (
        <div className={css.debtSummary}>
            <div>OVER ALL</div>
            <hr />
            <div>
                <span className={css.balance}>Balance : </span>
                <span className={balance >= 0 ? css.lend : css.borrow}>{`${
                    balance >= 0 ? "+" : ""
                }${balance}`}</span>
            </div>
        </div>
    );
};

export default DebtSummary;
