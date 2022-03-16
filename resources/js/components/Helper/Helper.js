// export const API_URL = "https://nkitservice.com/expensetest/api";
export const API_URL = "http://expenseapp.test/api";
// export const API_URL = "https://nkitservice.com/expense/api";
export const getDate = (newDate = "") => {
    const date = newDate ? new Date(newDate) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthString = (month + 1).toString().padStart(2, "0");
    const day = date.getDate();
    const dayString = date.getDate().toString().padStart(2, 0);
    const dayWeek = date.getDay() == 0 ? 7 : date.getDay();
    const LastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = day - dayWeek + 1;
    const lastDayOfWeek = day + (7 - dayWeek);
    const weekNumber = Math.ceil(day / 7);
    return {
        today: {
            title: "Today",
            date: `${year}-${monthString}-${dayString}`,
        },
        thisWeek: {
            title: "This Week",
            date: `${monthString}-${firstDayOfWeek
                .toString()
                .padStart(2, 0)} - ${monthString}-${lastDayOfWeek
                .toString()
                .padStart(2, 0)}`,
        },
        thisMonth: {
            title: "This Month",
            date: `${monthString}-01 - ${monthString}-${LastDayOfMonth}`,
        },
        thisYear: {
            title: "This Year",
            date: `01-01 - ${monthString}-${dayString}`,
        },
        weekNumber,
        monthNumber: month + 1,
        dayNumber: day,
        yearNumber: year,
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
export const getFirstLetterLowerWord = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
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

// export const uuid = () => {
//     return Date.now();
// };

export const expenseSummary = {
    today: {
        income: 0,
        expense: 0,
        balance: 0,
        chart: {},
    },
    week: {
        income: 0,
        expense: 0,
        balance: 0,
        chart: {},
    },
    month: {
        income: 0,
        expense: 0,
        balance: 0,
        chart: {},
    },
    year: {
        income: 0,
        expense: 0,
        balance: 0,
        chart: {},
    },
    balance: 0,
};

export const chartFilterOption = [
    { value: "today", label: "today" },
    { value: "week", label: "week" },
    { value: "month", label: "month" },
    { value: "year", label: "year" },
];
export const getExpenseSummary = (expenseSummary, dateGroup, data) => {
    const thisWeek = dateGroup.weekNumber;
    const thisMonth = dateGroup.monthNumber;
    const thisYear = dateGroup.yearNumber;
    data.forEach((el, i) => {
        if (dateGroup.today.date == el.date) {
            const today = expenseSummary.today;
            getExepnseSummaryOfType(today, el);
        }
        if (
            thisWeek == el.week &&
            thisMonth == el.month &&
            thisYear == el.year
        ) {
            const week = expenseSummary.week;
            getExepnseSummaryOfType(week, el);
        }
        if (thisMonth == el.month && thisYear == el.year) {
            const month = expenseSummary.month;
            getExepnseSummaryOfType(month, el);
        }

        if (thisYear == el.year) {
            const year = expenseSummary.year;
            getExepnseSummaryOfType(year, el);
        }

        expenseSummary.balance += el.amount;
    });
    // console.log(expenseSummary);
    return expenseSummary;
};

const getExepnseSummaryOfType = (dateType, el) => {
    dateType.income =
        el.type == "income" ? dateType.income + el.amount : dateType.income;
    dateType.expense =
        el.type == "expense" ? dateType.expense + el.amount : dateType.expense;
    dateType.balance += el.amount;
    dateType.chart[el.category] = dateType.chart[el.category]
        ? dateType.chart[el.category] + Math.abs(el.amount)
        : Math.abs(el.amount);
    return dateType;
};

export const getArray = (string, type) => {
    return string.split(type);
};

export const calculateProgress = (procress) => {
    return Math.floor((procress.completed / procress.total) * 100);
};

export const showWarning = (category, type) => {
    if (type == "current") {
        return `No Active ${getFirstLetterUpperWord(category)} Tasks`;
    } else {
        return `No Completed ${getFirstLetterUpperWord(category)} Tasks`;
    }
};

export const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = monthNames[month];
    const day = date.getDate();
    const dayString = date.getDate().toString().padStart(2, 0);

    return `${dayString} ${monthName} ${year}`;
};
export const uuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
};

export const updateDebtData = (array, index, formData) => {
    let newAmount = formData.amount;
    const debtArray = array[index].debts;
    let subIndex = debtArray.findIndex((el) => el.uuid == formData.uuid);
    if (debtArray[subIndex]) {
        let oldAmount = debtArray[subIndex].amount;
        newAmount = formData.amount - oldAmount;
        debtArray[subIndex] = formData;
    } else {
        debtArray.unshift(formData);
    }
    if (formData.type == "lend") {
        array[index].lendTotal += newAmount;
    } else {
        array[index].borrowTotal += newAmount;
    }
    return array;
};

export const errors = (errors) => {
    const error = "";
    for (let key in errors) {
        error += `${errors[key]}\n`;
    }
    return error;
};

export const getCategoryNameArray = (array) => {
    const newArray = [];
    array.forEach((element) => {
        newArray.push({ value: element.category, label: element.category });
    });
    return newArray;
};
