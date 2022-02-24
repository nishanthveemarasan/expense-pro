import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "giveto",
};

const debtSlice = createSlice({
    name: "debt",
    initialState,
    reducers: {
        updatePage(state, action) {
            state.page = action.payload.page;
        },
    },
});

export default debtSlice;
