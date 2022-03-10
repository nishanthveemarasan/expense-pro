import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import classes from "./ListItemDetails.module.css";
import { useDispatch } from "react-redux";
import { expenseStoreAction } from "../../../../Store/Store";
import ListItemSummary from "./ListItemSummary";
import ListSubItem from "./ListSubItem";
const ListItemDetails = (props) => {
    const dispatch = useDispatch();
    const onPageChangeHandler = () => {
        dispatch(
            expenseStoreAction.updateRecurringPage({
                page: "main",
                data: null,
            })
        );
    };
    const onEditPageChangeHandler = () => {
        const data = {
            mainPage: "editRecurring",
            page: "recurring",
        };
        const formdata = {
            ...props,
        };
        dispatch(expenseStoreAction.updateRecurringSpecificData({ formdata }));
        dispatch(expenseStoreAction.updatePage(data));
    };
    return (
        <>
            <div className={classes.heading}>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={onPageChangeHandler}
                />
                {props.status == "active" && (
                    <FontAwesomeIcon
                        icon={faEdit}
                        onClick={onEditPageChangeHandler}
                    />
                )}
            </div>
            <div style={{ marginTop: "3%" }}>
                <ListItemSummary {...props} />
                <div style={{ marginTop: "5%" }}>
                    {props.repeat_payments.length == 0 && (
                        <div className={classes.emptyData}>
                            No Payment has been made Yet
                        </div>
                    )}
                    {props.repeat_payments.length > 0 && (
                        <>
                            <div className={classes.subItemHeading}>
                                <div>Pay Number</div>
                                <div>Date</div>
                                <div>Amount</div>
                            </div>
                            {props.repeat_payments.map((item, i) => {
                                return (
                                    <ListSubItem {...item} key={i} number={i} />
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default ListItemDetails;
