import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { CartActions } from '../../store/CartSlice'

const UserDashboard = () => {
  const productData = useSelector((state) => state.Product.productData)
  const currentUser = useSelector((state) => state.UserData.currentUser)
  const cart = useSelector((state) => state.Cart.thisCart)
  const [qtty, setQtty] = useState()
  const dispatch = useDispatch()
  // console.log(cart);
  const addtoCartHandler = (item) => {
    let id;
    // let qty;

    let newCart = {
      id,
      email: currentUser.email,
      name: item.productName,
      price: item.productPrice,
      qty: 1,
    }
    dispatch(CartActions.addToCartHandler(newCart))
    let find = cart.find((i) => i.name === item.productName)
    console.log(find.qty)
    setQtty(find.qty)
  }
  return (

    <div className='container'>
      <h1>Welcome {currentUser.firstName} {currentUser.email} </h1>
      <div className='row justify-content-center'>
        {productData.map((product) =>
          <div className="col-4" key={product.id}>
            <div className="card my-3" >
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productPrice}</p>
                <div className='mx-auto'>
                  <button className='btn btn-sm btn-success mx-2' onClick={() => addtoCartHandler(product)} >Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <p> {qtty} </p>
      </div >
    </div>

  )
}

export default UserDashboard