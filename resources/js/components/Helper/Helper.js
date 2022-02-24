export const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthString = (month + 1).toString().padStart(2, "0");
    const day = date.getDate();
    const dayString = date.getDate().toString().padStart(2, 0);
    const dayWeek = date.getDay();
    const LastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = day - dayWeek + 1;
    const lastDayOfWeek = day + (7 - dayWeek);

    return {
        today: {
            title: "Today",
            date: `${year}-${monthString}-${dayString}`,
        },
        thisWeek: {
            title: "This Week",
            date: `${monthString}-${firstDayOfWeek} - ${monthString}-${lastDayOfWeek}`,
        },
        thisMonth: {
            title: "This Month",
            date: `${monthString}-01 - ${monthString}-${LastDayOfMonth}`,
        },
        thisYear: {
            title: "This Year",
            date: `01-01 - ${monthString}-${dayString}`,
        },
    };
};

export const extractDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, 0);

    return `${year}-${month}-${day}`;
};

export const getFirstLetterUpper = (string) => {
    return string[0].toUpperCase();
};

export const getFirstLetterUpperWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export const colorArray = [
    "primary",
    "success",
    "warning",
    "danger",
    "dark",
    "secondary",
    "info",
];

export const getIndex = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
