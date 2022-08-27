import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
    name: 'UI',
    initialState: { isSignedIn: false, toggle: false },
    reducers: { 
        toggle(state) {
            state.toggle = !state.toggle
        }

    }
})

export const UIActions = UISlice.actions;
export default UISlice;
