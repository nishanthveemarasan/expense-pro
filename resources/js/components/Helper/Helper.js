export const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthString = month.toString().padStart(2, "0");
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
