import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'Auth',
    initialState: { isSignedIn: false, },
    reducers: {
        signInHandler(state) {
            state.isSignedIn = true
        },
        signOutHandler(state) {
            state.isSignedIn = false
        },
     }
})
export const AuthActions = AuthSlice.actions;
export default AuthSlice;
