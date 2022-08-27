import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: 'ProductData',
    initialState: { productData: []},
    reducers: {
        storeProductData(state, action) {
            const newitem = action.payload;
            state.productData = [];
            newitem.forEach(function (newitem) {
                state.productData.push(newitem);
            });
        },


    }
})

export const ProductActions = ProductSlice.actions;
export default ProductSlice;
