import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "login",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updatePage(state, action) {
            state.page = action.payload.page;
        },
    },
});

export default authSlice;
