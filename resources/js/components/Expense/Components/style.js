export const duration = 200;

export const defaultStyle = {
    transition: `all ${duration}ms ease-out`,
    opacity: 0,
};

export const findStyles = (state, subCategoryPage = "") => {
    if (subCategoryPage == "maincategory" || subCategoryPage == "category") {
        return widthStyles[state];
    } else {
        return opacityStyle[state];
    }
};

export const opacityStyle = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

export const widthStyles = {
    entering: { width: "0%", opacity: 1 },
    entered: { width: "100%", opacity: 1 },
    exiting: { width: "0%", opacity: 1 },
    exited: { width: "0%", opacity: 1 },
};
