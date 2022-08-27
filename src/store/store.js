import { configureStore } from "@reduxjs/toolkit";
import UISlice from "./UISlice";
import UserDataSlice from "./UserDataSlice";
import ProductSlice from "./ProductSlice";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";

const store = configureStore({
    reducer: {
        UI: UISlice.reducer,
        UserData: UserDataSlice.reducer,
        Product: ProductSlice.reducer,
        Auth: AuthSlice.reducer,
        Cart: CartSlice.reducer,
    }
})

export default store;