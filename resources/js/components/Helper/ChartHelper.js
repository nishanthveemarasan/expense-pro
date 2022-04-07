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
const getCurrentMonthWithYear = () => {
    const date = new Date();
    return {
        month: date.getMonth(),
        year: date.getFullYear(),
    };
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
    const day = date.getDate();
    const monthString = (month + 1).toString().padStart(2, "0");
    const dateString = day.toString().padStart(2, "0");

    const today = `${year}-${monthString}-${dateString}`;
    const LastDayOfMonth = new Date(year, month + 1, 0).getDate();
    return {
        today,
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
    let currentWeek = "";
    const today = new Date(todayDetails().today).getTime();

    let i = 1;
    while (firstDayOfWeek.getTime() <= lastDayWeek.getTime()) {
        details = getWeekStartEndDetails(firstDayOfWeek);
        if (
            today >= new Date(details.dateStart).getTime() &&
            today <= new Date(details.dateEnd).getTime() &&
            !currentWeek
        ) {
            currentWeek = `week${i}`;
        }

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

    return { week, currentWeek };
};

export const weeklyChartData = (data, firstpayDate, lastPayDate) => {
    const weeklyDetails = getWeeklyArrayChartDetails(firstpayDate, lastPayDate);
    const weeklyArrayDetails = weeklyDetails.week;
    const currentWeek = weeklyDetails.currentWeek;

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
            const dayStart = new Date(week.dateStart).getTime();
            const dateEnd = new Date(week.dateEnd).getTime();
            if (
                new Date(item.date).getTime() >= dayStart &&
                new Date(item.date).getTime() <= dateEnd
            ) {
                const amount = Math.abs(item.amount);

                if (amount > limit) {
                    limit = amount;
                }
                if (!weeklyChartData[week.week].category[item.category]) {
                    weeklyChartData[week.week].category[item.category] = 0;
                }
                if (item.type.toLowerCase() == "expense") {
                    weeklyChartData[week.week].expense += amount;
                } else {
                    weeklyChartData[week.week].income += amount;
                }
                weeklyChartData[week.week].category[item.category] += amount;

                if (!category.includes(item.category)) {
                    category.push(item.category);
                }
                return;
            }
        });
    });

    return { weeklyChartData, category, limit, currentWeek };
};
const getLabelsForTotal = (array) => {
    array.unshift("");
    return array;
};

export const generateWeeklyExpenseAndIncomeChartColumnData = (data) => {
    const labels = [];
    let expense = [];
    let income = [];
    let categoryWise = [];

    let totalIncome = 0;
    let totalExpense = 0;
    let NoOfWeeksSpended = 0;

    let chartYIncomeAxis = [];
    let chartYExpenseAxis = [];

    const weeklyChartData = data.weeklyChartData;
    const currentWeek = data.currentWeek;
    const currentWeekLastIndex = currentWeek.slice(-1);
    const currentWeekIndex = currentWeekLastIndex ? currentWeekLastIndex : 0;

    const weeklyChartCategory = data.category;
    let i = 1;
    for (let weekly in weeklyChartData) {
        let key = `week${i}`;
        // console.log(currentWeekIndex, i);
        const chartKey = weeklyChartData[key];
        let chartKeyExpense = limitDemialPlaces(chartKey.expense);
        let chartKeyIncome = limitDemialPlaces(chartKey.income);
        totalIncome += chartKeyIncome;
        totalExpense += chartKeyExpense;
        if (i == 1) {
            chartYIncomeAxis.push(null);
            chartYExpenseAxis.push(null);
        }
        if (currentWeekIndex == 0) {
            chartYIncomeAxis.push(limitDemialPlaces(totalIncome));
            chartYExpenseAxis.push(limitDemialPlaces(totalExpense));
            if (chartKeyExpense > 0) {
                NoOfWeeksSpended += 1;
            }
        } else {
            if (i <= currentWeekIndex) {
                chartYIncomeAxis.push(limitDemialPlaces(totalIncome));
                chartYExpenseAxis.push(limitDemialPlaces(totalExpense));
                if (chartKeyExpense > 0) {
                    NoOfWeeksSpended += 1;
                }
            } else {
                chartYIncomeAxis.push(null);
                chartYExpenseAxis.push(null);
            }
        }

        // if (chartKeyExpense > 0) {
        //     NoOfWeeksSpended += 1;
        // }
        labels.push(chartKey.weekRange);

        expense.push(chartKeyExpense);
        income.push(chartKeyIncome);

        weeklyChartCategory.forEach((category) => {
            if (!categoryWise[category]) {
                categoryWise[category] = [];
            }
            const value = chartKey.category[category]
                ? limitDemialPlaces(chartKey.category[category])
                : 0;

            categoryWise[category].push(value);
        });
        i++;
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

    const seriesForTotal = [
        {
            name: "Expense",
            data: chartYExpenseAxis,
        },
        {
            name: "Income",
            data: chartYIncomeAxis,
        },
    ];

    const summary = {
        totalIncome: limitDemialPlaces(totalIncome),
        totalExpense: limitDemialPlaces(totalIncome),
        averageWeeklySpending: limitDemialPlaces(
            totalExpense / NoOfWeeksSpended
        ),
    };

    const summaryChartInTotal = {
        seriesForTotal,
        labels: getLabelsForTotal([...labels]),
    };
    return {
        series,
        labels,
        categoryWise,
        summary,
        summaryChartInTotal,
    };
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

export const extractMonthlyExpenseIncomeDataValues = (data, selectedYear) => {
    const currentDate = getCurrentMonthWithYear();

    const expense = [];
    const income = [];
    let chartYIncomeAxis = [];
    let chartYExpenseAxis = [];

    let totalIncome = 0;
    let totalExpense = 0;
    let NoOfMonthsSpended = 0;

    monthNames.forEach((month, i) => {
        let currentMonthExpense = limitDemialPlaces(data[month].expense);
        let currentMonthIncome = limitDemialPlaces(data[month].income);
        totalIncome += currentMonthIncome;
        totalExpense += currentMonthExpense;
        if (i == 0) {
            chartYIncomeAxis.push(null);
            chartYExpenseAxis.push(null);
        }
        if (selectedYear == currentDate.year) {
            if (i <= currentDate.month) {
                chartYIncomeAxis.push(limitDemialPlaces(totalIncome));
                chartYExpenseAxis.push(limitDemialPlaces(totalExpense));
                if (currentMonthExpense > 0) NoOfMonthsSpended += 1;
            } else {
                chartYIncomeAxis.push(null);
                chartYExpenseAxis.push(null);
            }
        } else {
            if (currentMonthExpense > 0) NoOfMonthsSpended += 1;
            chartYIncomeAxis.push(limitDemialPlaces(totalIncome));
            chartYExpenseAxis.push(limitDemialPlaces(totalExpense));
        }

        expense.push(limitDemialPlaces(data[month].expense));

        income.push(limitDemialPlaces(data[month].income));
    });
    const summaryChartInTotal = {
        series: [
            {
                name: "Expense",
                data: chartYExpenseAxis,
            },
            {
                name: "Income",
                data: chartYIncomeAxis,
            },
        ],
        totalIncome: limitDemialPlaces(totalIncome),
        totalExpense: limitDemialPlaces(totalExpense),
        avgSpending: limitDemialPlaces(totalExpense / NoOfMonthsSpended),
        labels: getLabelsForTotal([...monthNames]),
    };
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

        summaryChartInTotal,
    };
};
