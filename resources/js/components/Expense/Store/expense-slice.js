import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "dashboard",
    subCategoryPage: "maincategory",
    mainPage: "expenseCategory",
    action: "",
    createDebt: "",
    dateGroup: null,
    heading: "Expense Manager",
    payDate: null,
    data: {
        totalBalance: {
            balance: -24000,
        },
        todayExpense: {
            income: 0,
            expense: 20,
            balance: 22000,
        },
        showPayment: true,
    },
    model: false,
    payment: {
        type: "",
        add: { selectedCategory: "", amount: "" },
        transData: [],
        data: {
            category: [
                {
                    category: "Automobile",
                    items: [
                        "Fuel",
                        "insurance",
                        "Lease",
                        "Maintainance",
                        "Registration",
                    ],
                    color: "primary",
                },
                {
                    category: "EnterTainment",
                    items: ["Concert", "Movies", "Party", "Sports"],
                    color: "warning",
                },
                {
                    category: "Food",
                    items: ["Groceries", "Restaurent"],
                    color: "danger",
                },
                {
                    category: "Health",
                    items: ["Medical", "Prescription", "Insurance"],
                    color: "dark",
                },
                {
                    category: "House",
                    items: [
                        "Appliance",
                        "Home Maintenance",
                        "Rent",
                        "House Items",
                    ],
                    color: "secondary",
                },
                {
                    category: "Electronices",
                    items: [
                        "Computer",
                        "Electronics",
                        "Stationary",
                        "House Items",
                    ],
                    color: "danger",
                },
                {
                    category: "Loans",
                    items: ["Student", "Mortage", "Car Loans", "Other Loans"],
                    color: "info",
                },
                {
                    category: "Personal",
                    items: ["Clothing", "Donation", "Gift", "Shopping"],
                    color: "success",
                },
                {
                    category: "Utilities",
                    items: [
                        "Electric",
                        "Gas",
                        "Internet",
                        "Telephone",
                        "Water",
                    ],
                    color: "primary",
                },
                {
                    category: "Vacation",
                    items: ["Aroplane", "Food", "Hotel", "Transport"],
                    color: "warning",
                },
            ],
        },
    },

    selectedCategory: [
        {
            id: -1,
            show: false,
        },
    ],
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        showPayment(state, action) {
            state.data.showPayment = action.payload.showPayment;
        },
        setDate(state, action) {
            state.dateGroup = action.payload.dateGroup;
            state.payDate = action.payload.dateGroup.today.date;
        },
        setPayDate(state, action) {
            state.payDate = action.payload.date;
            state.model = !state.model;
        },
        showModel(state, action) {
            state.model = !state.model;
        },
        setPaymentType(state, action) {
            state.payment.type = action.payload.type;
        },
        removeTransactionItem(state, action) {
            const id = action.payload.id;
            const copyData = [...state.payment.transData];

            copyData.splice(id, 1);
            state.payment = {
                ...state.payment,
                transData: [...copyData],
            };
        },
        addTranssactionItem(state, action) {
            const copyData = [...state.payment.transData, action.payload.data];
            state.payment = {
                ...state.payment,
                transData: [...copyData],
            };
            state.payment.add = {
                selectedCategory: "",
                amount: "",
            };
        },

        updateSelectedCategory(state, action) {
            const id = action.payload.id;
            const currentArray = state.selectedCategory.slice();
            const findIndex = currentArray.findIndex((el) => el.id == id);
            if (findIndex !== -1) {
                const existingItem = currentArray[findIndex];
                const data = {
                    ...existingItem,
                    show: !existingItem.show,
                };
                currentArray[findIndex] = data;
            } else {
                const data = {
                    id,
                    show: true,
                };
                currentArray.push(data);
            }

            state.selectedCategory = [...currentArray];
        },

        updatePage(state, action) {
            state.mainPage = action.payload.mainPage;
            console.log(state.mainPage);
        },
        updateSubPage(state, action) {
            state.subCategoryPage = action.payload.page;
        },
        addNewCategory(state, action) {
            const copyArray = state.payment.category.slice();
            copyArray.push(action.payload.category);
            state.payment = {
                ...state.payment,
                category: [...copyArray],
            };
            state.subCategoryPage = "maincategory";
        },
        updateChosenCategory(state, action) {
            state.payment.add = {
                ...state.payment.add,
                selectedCategory: action.payload.value,
            };
            state.mainPage = "payment";
            state.selectedCategory = [
                {
                    id: -1,
                    show: false,
                },
            ];
        },
        updateAddPaymentAmount(state, action) {
            state.payment.add = {
                ...state.payment.add,
                amount: action.payload.value,
            };
        },
        savePayment(state, action) {
            state.payment = {
                ...state.payment,
                type: "",
                add: { selectedCategory: "", amount: "" },
                transData: [],
            };
            state.mainPage = "expenseCategory";
        },
    },
});

export default expenseSlice;
