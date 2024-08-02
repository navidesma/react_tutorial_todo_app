import { createSlice } from "@reduxjs/toolkit";

export interface UISliceType {
    token: string | null;
    isLoggedIn: boolean;
    firstName: string | null;
    lastName: string | null;
    notification: NotificationType | null;
}

export interface NotificationType {
    type: "error" | "info" | "success";
    message: string;
}

const initialState: UISliceType = {
    token: localStorage.getItem("token"),
    isLoggedIn: !!localStorage.getItem("token"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    notification: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        login(state, action: { payload: { token: string } }) {
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;

            state.isLoggedIn = true;
        },
        setUserInfo(state, action: { payload: { firstName: string; lastName: string } }) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        logout(state) {
            localStorage.clear();
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
