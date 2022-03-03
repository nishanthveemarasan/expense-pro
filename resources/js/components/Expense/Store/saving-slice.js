import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainPage: "savingCategory",
    page: "summary",
    showModal: false,
    data: [
        {
            uuid: 12354322,
            date: "2022-02-23",
            amount: 3400,
            type: "add",
            description: "Saving from income",
        },
        {
            uuid: 12354322,
            date: "2022-02-23",
            type: "pay",
            amount: -3400,
            description: "Saving from income",
        },
        {
            uuid: 12354322,
            date: "2022-02-23",
            type: "add",
            amount: 3400,
            description: "Saving from income",
        },
        {
            uuid: 12354322,
            date: "2022-02-23",
            type: "add",
            amount: 3400,
            description: "Saving from income",
        },
    ],
};

const savingSlice = createSlice({
    name: "saving",
    initialState,
    reducers: {
        updatePage(state, action) {
            state.mainPage = action.payload.mainPage;
            state.page = action.payload.page;
        },
        showModel(state, action) {
            state.showModal = !state.showModal;
        },
        updateSavingData(state, action) {
            const copyArray = state.data.slice();
            copyArray.unshift(action.payload.data);
            state.data = copyArray;
        },
    },
});

export default savingSlice;
