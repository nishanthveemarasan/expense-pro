import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons";
const DebtSummary = ({ css, balance }) => {
    return (
        <div className={css.debtSummary}>
            <div>OVER ALL</div>
            <hr />
            <div>
                <span className={css.balance}>Balance : </span>
                <span className={balance >= 0 ? css.lend : css.borrow}>
                    {`${balance >= 0 ? "+" : "-"}`}
                    <FontAwesomeIcon icon={faSterlingSign} />
                    {Math.abs(balance)}
                </span>
            </div>
        </div>
    );
};

export default DebtSummary;
