import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "giveto",
    mainPage: "debtsummary",
    action: "",
    createDebt: "",
    formData: {
        name: "",
        amount: "",
        description: "",
        date: "",
        type: "",
        uuid: "",
        id: null,
    },
    names: [{ value: "Nishanth", label: "Nishanth" }],
    lendData: [
        {
            uuid: 12224,
            name: "Nishanth",
            amount: "1520",
            type: "lend",
            description: "",
            date: "2022-02-21",
        },
    ],
    borrowData: [
        {
            uuid: 12223,
            name: "Nishanth",
            amount: 5682,
            description: "",
            type: "borrow",
            date: "2022-02-21",
        },
    ],
    debtData: [
        {
            name: "Nishanth",
            data: [
                {
                    uuid: 12224,
                    amount: 1520,
                    type: "lend",
                    description: "Sample test",
                    date: "2022-02-21",
                },
                {
                    uuid: 12223,
                    amount: 5682,
                    description: "",
                    type: "borrow",
                    date: "2022-02-21",
                },
            ],
            lendTotal: 1520,
            borrowTotal: 5682,
        },
    ],
    currentIndividualData: null,
};

const debtSlice = createSlice({
    name: "debt",
    initialState,
    reducers: {
        updatePage(state, action) {
            if (action.payload.type == "mainpage") {
                state.mainPage = action.payload.mainPage;
                state.page = action.payload.page;
                state.action = action.payload.action;
                state.createDebt = action.payload.create;
            } else {
                state.page = action.payload.page;
            }
        },
        updateFormData(state, action) {
            state.formData = {
                ...state.formData,
                [action.payload.type]: action.payload.value,
            };
        },

        createDebt(state, action) {
            if (action.payload.action == "lend") {
                const copyArray = state.lendData.slice();
                if (action.payload.formData.id != null) {
                    const arrayElement = action.payload.formData;
                    copyArray[action.payload.formData.id] = arrayElement;
                } else {
                    copyArray.push(action.payload.formData);
                    const copyNames = state.names.slice();
                    const exists = copyNames.find(
                        (element) =>
                            element.value.toLowerCase() ==
                            action.payload.formData.name.toLowerCase()
                    );
                    if (!exists) {
                        const name = action.payload.formData.name;
                        copyNames.push({ value: name, label: name });
                        state.names = copyNames;
                    }
                }
                state.lendData = [...copyArray];
            } else {
                const copyArray = state.borrowData.slice();
                if (action.payload.formData.id != null) {
                    const arrayElement = action.payload.formData;
                    copyArray[action.payload.formData.id] = arrayElement;
                } else {
                    copyArray.push(action.payload.formData);
                    const copyNames = state.names.slice();
                    const exists = copyNames.find(
                        (element) =>
                            element.value.toLowerCase() ==
                            action.payload.formData.name.toLowerCase()
                    );
                    if (!exists) {
                        const name = action.payload.formData.name;
                        copyNames.push({ value: name, label: name });
                        state.names = copyNames;
                    }
                }
                state.borrowData = [...copyArray];
            }

            state.formData = {
                name: "",
                amount: "",
                description: "",
                date: "",
                type: "",
                uuid: "",
                id: null,
            };
        },
        createFormData(state, action) {
            state.formData = action.payload.formData;
        },
        updateIndividualData(state, action) {
            state.currentIndividualData = action.payload.data;
        },
        createUpdateDebtData(state, action) {
            const formData = action.payload.formData;
            const copyArray = state.debtData.slice();
            let newAmount = formData.amount;
            let index = copyArray.findIndex((el) => el.name == formData.name);

            if (copyArray[index]) {
                const data = [...copyArray[index].data];
                let subIndex = data.findIndex((el) => el.uuid == formData.uuid);

                if (copyArray[index].data[subIndex]) {
                    let oldAmount = copyArray[index].data[subIndex].amount;
                    newAmount = formData.amount - oldAmount;
                    copyArray[index].data[subIndex] = formData;
                } else {
                    copyArray[index].data.push(formData);
                }
                if (formData.type == "lend") {
                    copyArray[index].lendTotal += newAmount;
                } else {
                    copyArray[index].borrowTotal += newAmount;
                }
                state.debtData = [...copyArray];
            } else {
                const data = {
                    uuid: formData.uuid,
                    name: formData.name,
                    data: [formData],
                    lendTotal: formData.type == "lend" ? formData.amount : 0,
                    borrowTotal: formData.type != "lend" ? formData.amount : 0,
                };
                copyArray.push(data);
                state.debtData = [...copyArray];
            }
        },
    },
});

export default debtSlice;
