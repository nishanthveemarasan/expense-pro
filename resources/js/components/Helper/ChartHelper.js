import { getMonthDetails, limitDemialPlaces, monthNames } from "./Helper";

export const getMonthsOgYearArrayDetails = (year) => {
    const firstDate = new Date(`${year}-01-01`);
    let currentMonth = new Date(`${year}-12-31`);
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

export const getMOnthlyExpenses = (data, year) => {
    const monthsData = [];
    const category = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        if (item.year == year) {
            const m = Math.abs(item.month) - 1;
            const month = monthNames[m];

            if (!monthsData[month]) {
                monthsData[month] = { expense: 0, income: 0, category: [] };
            }

            if (!monthsData[month].category[item.category]) {
                monthsData[month].category[item.category] = 0;
            }

            if (item.type == "expense") {
                monthsData[month].expense += Math.abs(item.amount);
            } else {
                monthsData[month].income += item.amount;
            }
            monthsData[month].category[item.category] += Math.abs(item.amount);

            if (!category.includes(item.category)) {
                category.push(item.category);
            }
        }
    }

    return { monthsData, category };
};

export const getMonthlySummaryChartData = (data, year) => {
    const summaryData = [];
    const getData = getMOnthlyExpenses(data, year);
    const monthlyData = getData.monthsData;
    const categories = getData.category;
    const categoryChartData = [];

    for (let i = 0; i < monthNames.length; i++) {
        const month = monthNames[i];
        if (monthlyData[month]) {
            summaryData[month] = monthlyData[month];
        } else {
            summaryData[month] = { expense: 0, income: 0, category: [] };
        }
        categories.forEach((category) => {
            if (!categoryChartData[category]) {
                categoryChartData[category] = [];
            }
            if (!summaryData[month].category[category]) {
                categoryChartData[category].push(0);
            } else {
                categoryChartData[category].push(
                    limitDemialPlaces(summaryData[month].category[category])
                );
            }
        });
    }
    return { summaryData, categoryChartData, categories };
};
export const todayDetails = (currentDate = "") => {
    const date = currentDate ? new Date(currentDate) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthString = (month + 1).toString().padStart(2, "0");
    const LastDayOfMonth = new Date(year, month + 1, 0).getDate();
    return {
        year,
        month: month,
        monthFirstDay: `${year}-${monthString}-01`,
        lastMonthDay: `${year}-${monthString}-${LastDayOfMonth}`,
    };
};

export const getWeekStartEndDetails = (firstDayOfWeek) => {
    const lastDayOfWeek = new Date(firstDayOfWeek);
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
        dayWeekStart: `${(firstDayOfWeek.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${firstDayOfWeek
            .getDate()
            .toString()
            .padStart(2, "0")}`,
        dayWeekEnd: `${(lastDayOfWeek.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${lastDayOfWeek
            .getDate()
            .toString()
            .padStart(2, "0")}`,
        dayStartMonth: firstDayOfWeek.getMonth() + 1,
        dayEnd: lastDayOfWeek.getDate(),
        dayEndYear: lastDayOfWeek.getFullYear(),
        dayEndMonth: lastDayOfWeek.getMonth() + 1,
    };
};

const getWeeklyArrayChartDetails = (firstpayDate, lastPayDate) => {
    let firstDayOfWeek = new Date(firstpayDate);
    let lastDayWeek = new Date(lastPayDate);
    let details;
    let week = [];
    let i = 1;
    while (firstDayOfWeek.getTime() <= lastDayWeek.getTime()) {
        details = getWeekStartEndDetails(firstDayOfWeek);
        week.push({
            dateStart: details.dateStart,
            dateEnd: details.dateEnd,
            dayStart: details.dayStart,
            dayEnd: details.dayEnd,
            weekRange: `${details.dayWeekStart} - ${details.dayWeekEnd}`,
            week: `week${i}`,
            dayStartMonth: details.dayStartMonth,
            dayEndMonth: details.dayEndMonth,
            dayStartYear: details.dayStartYear,
            dayEndYear: details.dayEndYear,
        });

        const lastfirstDayOfWeek = new Date(details.dateEnd);
        lastfirstDayOfWeek.setDate(lastfirstDayOfWeek.getDate() + 1);
        firstDayOfWeek = new Date(lastfirstDayOfWeek);
        i++;
    }
    return week;
};

export const weeklyChartData = (data, firstpayDate, lastPayDate) => {
    const weeklyArrayDetails = getWeeklyArrayChartDetails(
        firstpayDate,
        lastPayDate
    );

    const weeklyChartData = [];
    const category = [];
    let limit = 0;
    data.forEach((item) => {
        weeklyArrayDetails.forEach((week) => {
            if (!weeklyChartData[week.week]) {
                weeklyChartData[week.week] = {
                    expense: 0,
                    income: 0,
                    weekRange: week.weekRange,
                    category: [],
                };
            }

            if (
                new Date(item.date).getTime() >=
                    new Date(week.dateStart).getTime() &&
                new Date(item.date).getTime() <=
                    new Date(week.dateEnd).getTime()
            ) {
                if (Math.abs(item.amount) > limit) {
                    limit = Math.abs(item.amount);
                }
                if (!weeklyChartData[week.week].category[item.category]) {
                    weeklyChartData[week.week].category[item.category] = 0;
                }
                if (item.type.toLowerCase() == "expense") {
                    weeklyChartData[week.week].expense += Math.abs(item.amount);
                } else {
                    weeklyChartData[week.week].income += Math.abs(item.amount);
                }
                weeklyChartData[week.week].category[item.category] += Math.abs(
                    item.amount
                );

                if (!category.includes(item.category)) {
                    category.push(item.category);
                }
                return;
            }
        });
    });

    return { weeklyChartData, category, limit };
};

export const generateWeeklyExpenseAndIncomeChartColumnData = (data) => {
    const labels = [];
    let expense = [];
    let income = [];
    let categoryWise = [];
    let limit = 0;
    const weeklyChartData = data.weeklyChartData;
    const weeklyChartCategory = data.category;
    for (let key in weeklyChartData) {
        const chartKey = weeklyChartData[key];

        labels.push(chartKey.weekRange);
        if (chartKey.expense > limit) {
            limit = limitDemialPlaces(chartKey.expense);
        }
        if (chartKey.income > limit) {
            limit = limitDemialPlaces(chartKey.income);
        }
        expense.push(limitDemialPlaces(chartKey.expense));
        income.push(limitDemialPlaces(chartKey.income));
        weeklyChartCategory.forEach((category) => {
            if (!categoryWise[category]) {
                categoryWise[category] = [];
            }
            const value = chartKey.category[category]
                ? limitDemialPlaces(chartKey.category[category])
                : 0;

            if (value > limit) {
                limit = value;
            }
            categoryWise[category].push(value);
        });
    }

    const series = [
        {
            name: "Expense",
            data: expense,
        },
        {
            name: "Income",
            data: income,
        },
    ];
    return { series, labels, categoryWise, limit };
};

export const constructWeeklyExpenseWiseData = (data) => {
    const categoryWiseSeries = [];
    for (let category in data) {
        if (category.toLowerCase() != "income") {
            categoryWiseSeries.push({
                name: category,
                data: data[category],
            });
        }
    }
    return categoryWiseSeries;
};

export const extractMonthlyExpenseIncomeDataValues = (data) => {
    const expense = [];
    const income = [];
    let highNumber = 0;
    monthNames.forEach((month) => {
        expense.push(limitDemialPlaces(data[month].expense));
        if (data[month].expense > highNumber) {
            highNumber = data[month].expense;
        }
        income.push(limitDemialPlaces(data[month].income));
        if (data[month].income > highNumber) {
            highNumber = data[month].income;
        }
    });

    return {
        series: [
            {
                name: "Expense",
                data: expense,
            },
            {
                name: "Income",
                data: income,
            },
        ],
        highNumber,
    };
};
