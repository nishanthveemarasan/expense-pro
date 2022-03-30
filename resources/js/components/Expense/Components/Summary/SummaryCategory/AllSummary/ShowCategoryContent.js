import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import ShowCategorySummary from "../../ShowCategorySummary/ShowCategorySummary";
import ShowSingleBox from "../../showSingleBox/ShowSingleBox";
import classes from "./AllSummary.module.css";
const ShowCategoryContent = ({
    goBack,
    categoryData,
    categoryKey,
    currentIndex,
    changeIndex,
    removeItem,
    update,
}) => {
    return (
        <>
            <div>
                <FontAwesomeIcon
                    icon={faArrowCircleLeft}
                    className={classes.icon}
                    onClick={goBack}
                />
            </div>
            <ShowCategorySummary
                cKey={categoryKey}
                balance={categoryData.total}
            />
            {categoryData.data.map((el, i) => {
                return (
                    <div style={{ marginTop: "20px" }} key={i}>
                        <ShowSingleBox
                            data={el}
                            key={i}
                            index={i}
                            currentIndex={currentIndex}
                            changeIndex={changeIndex}
                            removeItem={removeItem}
                            update={update}
                        />
                    </div>
                );
            })}
        </>
    );
};

export default ShowCategoryContent;
