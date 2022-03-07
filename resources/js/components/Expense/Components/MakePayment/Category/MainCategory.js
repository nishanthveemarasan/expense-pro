import React from "react";
import classes from "./Category.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";
import { getFirstLetterUpper } from "../../../../Helper/Helper";
import Avatar from "../../../UI/Avatar/Avatar";
const MainCategory = (props) => {
    const dispatch = useDispatch();

    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.payment.data.category,
            selectedCategory: state.expenseStore.selectedCategory,
            prevMainPage: state.expenseStore.prevMainPage,
        };
    };
    const state = useSelector(mapStateToProps);

    const onChangeNavHandler = (id) => {
        dispatch(expenseStoreAction.updateSelectedCategory({ id }));
    };

    const showNavItem = (index) => {
        const findIndex = state.selectedCategory.findIndex(
            (el) => el.id == index
        );
        if (findIndex != -1) {
            return state.selectedCategory[findIndex].show;
        }
        return false;
    };

    const onSelectedCategoryHandler = (main, sub) => {
        const value = `${main}:${sub}`;
        dispatch(
            expenseStoreAction.updateChosenCategory({
                value,
                prevMainPage: state.prevMainPage,
            })
        );
    };
    return (
        <ul style={{ color: "black" }}>
            {state.data.map((element, i) => {
                return (
                    <li className={classes.NavbarItem} key={i}>
                        <div
                            className={classes.HomeButton}
                            onClick={onChangeNavHandler.bind(this, i)}
                        >
                            <div className={classes.headingGroup}>
                                <Avatar
                                    size="lg"
                                    color={element.color}
                                    align="3"
                                >
                                    {getFirstLetterUpper(element.category)}
                                </Avatar>
                                <div className={classes.Heading}>
                                    {element.category}
                                </div>
                            </div>
                            <div className={classes.HeadingArrow}>
                                <div>
                                    <i
                                        className={`bi bi-caret-${
                                            showNavItem(i) ? "down" : "up"
                                        }-square ${classes.HeadingArrayIcon}`}
                                    ></i>
                                </div>
                            </div>
                        </div>
                        <ul
                            className={
                                showNavItem(i)
                                    ? classes.DropMenuClicked
                                    : classes.DropMenuNotClicked
                            }
                        >
                            {showNavItem(i) &&
                                element.items.map((el, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className={classes.subItems}
                                        >
                                            <div
                                                className={classes.subItem}
                                                onClick={onSelectedCategoryHandler.bind(
                                                    this,
                                                    element.category,
                                                    el
                                                )}
                                            >
                                                {el}
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
};
export default MainCategory;
