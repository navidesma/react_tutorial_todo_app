import { createSlice, Dispatch, UnknownAction } from "@reduxjs/toolkit";

export interface UISliceType {
    token: string | null;
    isLoggedIn: boolean;
    firstName: string | null;
    lastName: string | null;
    notification: NotificationType | null;
    reloadCounter: number;
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
    reloadCounter: 0,
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

            localStorage.setItem("firstName", action.payload.firstName);
            localStorage.setItem("lastName", action.payload.lastName);
        },
        logout(state) {
            localStorage.clear();
            state.token = null;
            state.isLoggedIn = false;
        },
        showNotification(state, action: { payload: NotificationType }) {
            state.notification = action.payload;
        },
        clearNotification(state) {
            state.notification = null;
        },
        toggleReloadPage(state) {
            state.reloadCounter += 1;
        },
    },
});

export const toggleNotification = (
    dispatch: Dispatch<UnknownAction>,
    notification: NotificationType,
) => {
    dispatch(uiActions.showNotification(notification));

    setTimeout(() => dispatch(uiActions.clearNotification()), 3000);
};

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
