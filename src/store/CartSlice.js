import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'Cart',
    initialState: { thisCart: [], },
    reducers: {
        addToCartHandler(state, action) {
            const newProduct = action.payload
            // let q;
            const existingProductIndex = state.thisCart.findIndex((item) => item.name === newProduct.name)
            // console.log('Index is', existingProductIndex);
            // let match = state.thisCart.find((item) => item.name === newProduct.name && item.email === newProduct.email)

            const existingProduct = state.thisCart[existingProductIndex]

            let updatedProducts;

            // console.log('result ', state.thisCart[existingProductIndex]);
            if (existingProduct) {
                const updatedProduct = {
                    ...existingProduct,
                    qty: existingProduct.qty + 1
                }
                updatedProducts = [...state.thisCart]
                // console.log('updated ', updatedProducts);
                updatedProducts[existingProductIndex] = updatedProduct
                state.thisCart = updatedProducts
            } else {
                state.thisCart = [...state.thisCart, newProduct]
            }

            // if (match) {
            //     // console.log('matching data', match.qty = match.qty + 1);



            // } 

            // console.log(state.thisCart);

        }
    }
})
export const CartActions = CartSlice.actions;
export default CartSlice;
