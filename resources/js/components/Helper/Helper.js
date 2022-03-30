// export const API_URL = "https://nkitservice.com/expensetest/api";
export const API_URL = "http://expenseapp.test/api";
// export const API_URL = "https://nkitservice.com/expense/api";
export const getDate = (newDate = "") => {
    const date = newDate ? new Date(newDate) : new Date();
    const firstDOfWeek = new Date(date);
    const lastDOfWeek = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthString = (month + 1).toString().padStart(2, "0");
    const day = date.getDate();
    const dayString = date.getDate().toString().padStart(2, 0);
    const dayWeek = date.getDay() == 0 ? 7 : date.getDay();
    const LastDayOfMonth = new Date(year, month + 1, 0).getDate();
    firstDOfWeek.setDate(firstDOfWeek.getDate() - (dayWeek - 1));
    const firstDayOfWeek = firstDOfWeek.getDate().toString().padStart(2, "0");
    const monthOfFDayWeek = (firstDOfWeek.getMonth() + 1)
        .toString()
        .padStart(2, "0");
    const yearOfFDayWeek = firstDOfWeek.getFullYear();
    lastDOfWeek.setDate(lastDOfWeek.getDate() + (7 - dayWeek));
    const lastDayOfWeek = lastDOfWeek.getDate().toString().padStart(2, "0");
    const monthOfLDayWeek = (lastDOfWeek.getMonth() + 1)
        .toString()
        .padStart(2, "0");
    const yearOfLDayWeek = lastDOfWeek.getFullYear();
    const weekNumber = Math.ceil(day / 7);
    return {
        today: {
            title: "Today",
            date: `${year}-${monthString}-${dayString}`,
        },
        thisWeek: {
            title: "This Week",
            date: `${monthOfFDayWeek}-${firstDayOfWeek
                .toString()
                .padStart(2, 0)} - ${monthOfLDayWeek}-${lastDayOfWeek
                .toString()
                .padStart(2, 0)}`,
            month: month + 1,
            fDay: firstDayOfWeek,
            fWdate: `${yearOfFDayWeek}-${monthOfFDayWeek}-${firstDayOfWeek}`,
            lDay: lastDayOfWeek,
            lWdate: `${yearOfLDayWeek}-${monthOfLDayWeek}-${lastDayOfWeek}`,
            year: year,
            week: weekNumber,
        },
        thisMonth: {
            title: "This Month",
            date: `${monthString}-01 - ${monthString}-${LastDayOfMonth}`,
            fDay: 1,
            fMdate: `${year}-${monthString}-01`,
            lDay: LastDayOfMonth,
            lMdate: `${year}-${monthString}-${LastDayOfMonth}`,
            year: year,
            month: month + 1,
        },
        thisYear: {
            title: "This Year",
            date: `01-01 - ${monthString}-${dayString}`,
            fYdate: `${year}-01-01`,
            lYdate: `${year}-12-31`,
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

export const toLower = (str) => {
    return str.toLowerCase();
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
    const weekStart = dateGroup.thisWeek.fWdate;
    const weekEnd = dateGroup.thisWeek.lWdate;

    data.forEach((el, i) => {
        if (
            new Date(dateGroup.today.date).getTime() ==
            new Date(el.date).getTime()
        ) {
            const today = expenseSummary.today;
            getExepnseSummaryOfType(today, el);
        }
        if (
            new Date(el.date).getTime() >= new Date(weekStart).getTime() &&
            new Date(el.date).getTime() <= new Date(weekEnd).getTime()
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

export const getWeekDetails = (firstDayOfWeek, lastDayOfWeek) => {
    const dayWeek = firstDayOfWeek.getDay() == 0 ? 7 : firstDayOfWeek.getDay();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - (dayWeek - 1));
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (7 - dayWeek));

    return {
        dateStart: `${firstDayOfWeek.getFullYear()}-${(
            firstDayOfWeek.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${firstDayOfWeek
            .getDate()
            .toString()
            .padStart(2, "0")}`,
        dateEnd: `${lastDayOfWeek.getFullYear()}-${(
            lastDayOfWeek.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${lastDayOfWeek
            .getDate()
            .toString()
            .padStart(2, "0")}`,
        dayStart: firstDayOfWeek.getDate(),
        dayStartYear: firstDayOfWeek.getFullYear(),
        dayStartMonth: firstDayOfWeek.getMonth() + 1,
        dayEnd: lastDayOfWeek.getDate(),
        dayEndYear: lastDayOfWeek.getFullYear(),
        dayEndMonth: lastDayOfWeek.getMonth() + 1,
    };
};

export const getWeeklyArrayDetails = (firstpayDate) => {
    const firstDate = new Date(firstpayDate);
    let firstDayOfWeek = new Date();
    let lastDayOfWeek = new Date();
    let details;
    let week = [];

    while (lastDayOfWeek.getTime() >= firstDate.getTime()) {
        details = getWeekDetails(firstDayOfWeek, lastDayOfWeek);
        week.push({
            dateStart: details.dateStart,
            dateEnd: details.dateEnd,
            dayStart: details.dayStart,
            dayEnd: details.dayEnd,
            dayStartMonth: details.dayStartMonth,
            dayEndMonth: details.dayEndMonth,
            dayStartYear: details.dayStartYear,
            dayEndYear: details.dayEndYear,
        });

        const lastfirstDayOfWeek = new Date(firstDayOfWeek);
        lastfirstDayOfWeek.setDate(lastfirstDayOfWeek.getDate() - 1);
        firstDayOfWeek = new Date(lastfirstDayOfWeek);
        lastDayOfWeek = new Date(lastfirstDayOfWeek);
    }
    return week;
};

export const filterDataByDateGroup = (dataArray, dateGroup) => {
    let data = [];
    let total = 0;
    const category = [];
    dataArray.forEach((el, i) => {
        if (
            new Date(el.date).getTime() >=
                new Date(dateGroup.dateStart).getTime() &&
            new Date(el.date).getTime() <= new Date(dateGroup.dateEnd).getTime()
        ) {
            data.push(el);
            total += el.amount;

            if (!category[el.category]) {
                category[el.category] = {
                    data: [],
                    total: 0,
                };
            }
            category[el.category].data.push(el);
            category[el.category].total += el.amount;
        }
    });
    return { data, total: total.toFixed(2), category };
};

export const filterDataByType = (dataArray, type) => {
    let data = [];
    let total = 0;
    const category = [];
    dataArray.forEach((el, i) => {
        if (el.type == type) {
            data.push(el);
            total += el.amount;

            if (!category[el.category]) {
                category[el.category] = {
                    data: [],
                    total: 0,
                };
            }
            category[el.category].data.push(el);
            category[el.category].total += el.amount;
        }
    });

    return { data, total: total.toFixed(2), category };
};

export const getTtotalExpenseIncome = (dataArray) => {
    let summary = {
        expense: 0,
        income: 0,
        category: [],
    };
    dataArray.forEach((el, i) => {
        if (el.type == "expense") {
            summary.expense += el.amount;
        } else {
            summary.income += el.amount;
        }

        if (!summary.category[el.category]) {
            summary.category[el.category] = {
                data: [],
                total: 0,
            };
        }
        summary.category[el.category].data.push(el);
        summary.category[el.category].total += el.amount;
    });

    return summary;
};

export const filterAllSummaryDataByDateGroup = (dataArray, dateGroup) => {
    let summary = {
        data: [],
        expense: 0,
        income: 0,
        category: [],
    };
    dataArray.forEach((el, i) => {
        if (
            new Date(el.date).getTime() >=
                new Date(dateGroup.dateStart).getTime() &&
            new Date(el.date).getTime() <= new Date(dateGroup.dateEnd).getTime()
        ) {
            summary.data.push(el);
            if (el.type == "expense") {
                summary.expense += el.amount;
            } else {
                summary.income += el.amount;
            }
            if (!summary.category[el.category]) {
                summary.category[el.category] = {
                    data: [],
                    total: 0,
                };
            }
            summary.category[el.category].data.push(el);
            summary.category[el.category].total += el.amount;
        }
    });

    return {
        data: summary.data,
        expense: parseFloat(summary.expense, 2),
        income: parseFloat(summary.income, 2),
        balance: parseFloat(summary.expense + summary.income, 2),
        category: summary.category,
    };
};

export const getMonthDetails = (currentMonth) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const LastDayOfMonth = new Date(year, month + 1, 0).getDate();

    return {
        monthStart: `${year}-${(month + 1).toString().padStart(2, "0")}-01`,
        monthEnd: `${year}-${(month + 1)
            .toString()
            .padStart(2, "0")}-${LastDayOfMonth}`,
        monthYear: year,
        month: month,
    };
};

export const getMonthlyArrayDetails = (firstpayDate) => {
    const firstDate = new Date(firstpayDate);
    let currentMonth = new Date();
    let month = [];
    while (currentMonth.getTime() >= firstDate.getTime()) {
        let details = getMonthDetails(currentMonth);
        currentMonth = new Date(details.monthStart);
        currentMonth.setDate(currentMonth.getDate() - 1);
        month.push({
            dateStart: details.monthStart,
            dateEnd: details.monthEnd,
            monthYear: details.monthYear,
            month: details.month,
        });
    }
    return month;
};

export const getYearDetails = (currentYear) => {
    const year = currentYear.getFullYear();

    return {
        dateStart: `${year}-01-01`,
        dateEnd: `${year}-12-31`,
        year,
    };
};

export const getYearlyArrayDetails = (firstpayDate) => {
    const firstDate = new Date(firstpayDate);
    let currentYear = new Date();
    let year = [];

    while (currentYear.getTime() >= firstDate.getTime()) {
        let details = getYearDetails(currentYear);
        year.push({
            dateStart: details.dateStart,
            dateEnd: details.dateEnd,
            year: details.year,
        });
        currentYear = new Date(details.dateStart);
        currentYear.setDate(currentYear.getDate() - 1);
    }
    return year;
};

export const getFilterDataByCategoryWise = (data) => {
    const category = [];

    data.forEach((item) => {
        if (!category[item.category]) {
            category[item.category] = {
                data: [],
                total: 0,
            };
        }
        category[item.category].data.push(item);
        category[item.category].total += item.amount;
    });
};

export const updateExpenseSummary = (
    summary,
    dateGroup,
    data,
    updatedAmount
) => {
    const date = data.date;
    let chartAmount = updatedAmount;
    if (data.type == "expense") {
        chartAmount =
            updatedAmount > 0 ? -updatedAmount : Math.abs(updatedAmount);
    }

    if (new Date(dateGroup.today.date).getTime() == new Date(date).getTime()) {
        if (data.type == "expense") {
            summary.today.expense += updatedAmount;
            summary.today.balance += updatedAmount;
            summary.today.chart[data.category] += chartAmount;
        } else {
            summary.today.income += updatedAmount;
            summary.today.balance += updatedAmount;
            summary.today.chart[data.category] += updatedAmount;
        }
    }
    if (
        new Date(date).getTime() >=
            new Date(dateGroup.thisWeek.fWdate).getTime() &&
        new Date(date).getTime() <=
            new Date(dateGroup.thisWeek.lWdate).getTime()
    ) {
        if (data.type == "expense") {
            summary.week.expense += updatedAmount;
            summary.week.balance += updatedAmount;
            summary.week.chart[data.category] += chartAmount;
        } else {
            summary.week.income += updatedAmount;
            summary.week.balance += updatedAmount;
            summary.week.chart[data.category] += updatedAmount;
        }
    }
    if (
        dateGroup.thisMonth.month == data.month &&
        dateGroup.thisMonth.year == data.year
    ) {
        if (data.type == "expense") {
            summary.month.expense += updatedAmount;
            summary.month.balance += updatedAmount;
            summary.month.chart[data.category] += chartAmount;
        } else {
            summary.month.income += updatedAmount;
            summary.month.balance += updatedAmount;
            summary.month.chart[data.category] += updatedAmount;
        }
    }
    if (dateGroup.yearNumber == data.year) {
        if (data.type == "expense") {
            summary.year.expense += updatedAmount;
            summary.year.balance += updatedAmount;
            summary.year.chart[data.category] += chartAmount;
        } else {
            summary.year.income += updatedAmount;
            summary.year.balance += updatedAmount;
            summary.year.chart[data.category] += updatedAmount;
        }
    }

    summary.balance += updatedAmount;
    return summary;
};

export const removeItemFromExpenseArray = (expenseData, singleData) => {
    const findIndex = expenseData.findIndex((el) => el.uuid == singleData.uuid);
    expenseData.splice(findIndex, 1);

    return expenseData;
};

export const updateItemInExpenseArray = (expenseData, requestData) => {
    const findIndex = expenseData.findIndex(
        (el) => el.uuid == requestData.data.uuid
    );
    expenseData[findIndex] = {
        ...expenseData[findIndex],
        amount: requestData.newValue,
    };
    return expenseData;
};

export const updateExpenseSummaryData = (summary, dateGroup, requestData) => {
    const date = requestData.data.date;
    let updatedAmount = 0;
    let chartAmount = 0;

    if (requestData.data.type == "expense") {
        updatedAmount =
            Math.abs(requestData.data.amount) + requestData.newValue;
        chartAmount =
            updatedAmount > 0 ? -updatedAmount : Math.abs(updatedAmount);
    } else {
        updatedAmount = requestData.newValue - requestData.data.amount;
    }

    if (new Date(dateGroup.today.date).getTime() == new Date(date).getTime()) {
        if (data.type == "expense") {
            summary.today.expense += updatedAmount;
            summary.today.balance += updatedAmount;
            summary.today.chart[requestData.data.category] += chartAmount;
        } else {
            summary.today.income += updatedAmount;
            summary.today.balance += updatedAmount;
            summary.today.chart[requestData.data.category] += updatedAmount;
        }
    }
    if (
        new Date(date).getTime() >=
            new Date(dateGroup.thisWeek.fWdate).getTime() &&
        new Date(date).getTime() <=
            new Date(dateGroup.thisWeek.lWdate).getTime()
    ) {
        if (requestData.data.type == "expense") {
            summary.week.expense += updatedAmount;
            summary.week.balance += updatedAmount;
            summary.week.chart[requestData.data.category] += chartAmount;
        } else {
            summary.week.income += updatedAmount;
            summary.week.balance += updatedAmount;
            summary.week.chart[requestData.data.category] += updatedAmount;
        }
    }
    if (
        dateGroup.thisMonth.month == requestData.data.month &&
        dateGroup.thisMonth.year == requestData.data.year
    ) {
        if (requestData.data.type == "expense") {
            summary.month.expense += updatedAmount;
            summary.month.balance += updatedAmount;
            summary.month.chart[requestData.data.category] += chartAmount;
        } else {
            summary.month.income += updatedAmount;
            summary.month.balance += updatedAmount;
            summary.month.chart[requestData.data.category] += updatedAmount;
        }
    }
    if (dateGroup.yearNumber == requestData.data.year) {
        if (requestData.data.type == "expense") {
            summary.year.expense += updatedAmount;
            summary.year.balance += updatedAmount;
            summary.year.chart[requestData.data.category] += chartAmount;
        } else {
            summary.year.income += updatedAmount;
            summary.year.balance += updatedAmount;
            summary.year.chart[requestData.data.category] += updatedAmount;
        }
    }

    summary.balance += updatedAmount;
    return summary;
};
