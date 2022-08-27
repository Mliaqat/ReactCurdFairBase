import { createSlice } from "@reduxjs/toolkit";

const UserDataSlice = createSlice({
    name: 'UserData',
    initialState: { userData: [], currentUser: {}, adminIsAvailable: false },
    reducers: {
        storeUserData(state, action) {
            const newitem = action.payload;
            state.userData = [];
            newitem.forEach(function (newitem) {
                state.userData.push(newitem);
            });
            // state.userData = [...state.userData, action.payload]
            // console.log(state.userData);
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },

    }
})

export const userDataActions = UserDataSlice.actions;
export default UserDataSlice;
