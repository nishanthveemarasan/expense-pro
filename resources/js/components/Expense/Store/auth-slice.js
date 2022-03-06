import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "login",
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updatePage(state, action) {
            state.page = action.payload.page;
        },
        updateLoading(state, action) {
            state.loading = !state.loading;
        },
    },
});

export default authSlice;
