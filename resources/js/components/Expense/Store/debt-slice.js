import { createSlice } from "@reduxjs/toolkit";
import { updateDebtData } from "../../Helper/Helper";

const initialState = {
    appToken: null,
    page: "giveto",
    mainPage: "debtsummary",
    action: "",
    showModal: false,
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
    lendData: [],
    borrowData: [],
    debtData: [],
    currentIndividualData: null,
    errorModal: {
        open: false,
        error: "",
    },
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
                    copyArray.unshift(action.payload.formData);
                    const copyNames = state.names.slice();
                    const exists = copyNames.find(
                        (element) =>
                            element.value.toLowerCase() ==
                            action.payload.formData.name.toLowerCase()
                    );
                    if (!exists) {
                        const name = action.payload.formData.name;
                        copyNames.unshift({ value: name, label: name });
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
                    copyArray.unshift(action.payload.formData);
                    const copyNames = state.names.slice();
                    const exists = copyNames.find(
                        (element) =>
                            element.value.toLowerCase() ==
                            action.payload.formData.name.toLowerCase()
                    );
                    if (!exists) {
                        const name = action.payload.formData.name;
                        copyNames.unshift({ value: name, label: name });
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
            const copyArray = [...state.debtData];
            let index = copyArray.findIndex((el) => el.name == formData.name);
            if (copyArray[index]) {
                const array = updateDebtData(state.debtData, index, formData);
                state.debtData = [...array];
            } else {
                const data = {
                    uuid: formData.uuid,
                    name: formData.name,
                    debts: [formData],
                    lendTotal: formData.type == "lend" ? formData.amount : 0,
                    borrowTotal: formData.type != "lend" ? formData.amount : 0,
                };
                copyArray.unshift(data);
                state.debtData = [...copyArray];
            }
        },
        showModal(state, action) {
            state.showModal = !state.showModal;
        },

        addInitialData(state, action) {
            state.names = action.payload.names;
            state.borrowData = action.payload.borrowData;
            state.lendData = action.payload.lendData;
            state.debtData = action.payload.debtData;
            state.appToken = action.payload.token;
        },
        onCloseErrorModal(state, action) {
            state.errorModal = {
                open: false,
                error: "",
                showHeading: false,
                showButton: false,
            };
        },
        onOpenErrorModal(state, action) {
            state.errorModal = {
                open: true,
                error: action.payload.error,
            };
        },
    },
});

export default debtSlice;
