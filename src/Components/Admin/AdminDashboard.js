import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { UIActions } from '../../store/UISlice'

const AdminDashboard = () => {
    const productData = useSelector((state) => state.Product.productData)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [price, setPrice] = useState('')
    const [editvalue, setEditValue] = useState('')
    const [editprice, setEditPrice] = useState('')
    const [dataId, setDataId] = useState('')
    const addProductHandler = async (event) => {
        event.preventDefault()
        let id;
        let productDetails = {
            id,
            productName: value,
            productPrice: price
        }
        await axios.post('https://mac-db-2b878-default-rtdb.firebaseio.com/products.json', productDetails).then(
            (res) => { dispatch(UIActions.toggle()) }
        )
        setPrice('')
        setValue('')
    }
    const deleteHandler = async (id) => {
        await axios.delete(`https://mac-db-2b878-default-rtdb.firebaseio.com/products/${id}.json`).then(
            (res) => { dispatch(UIActions.toggle()) }
        )
    }
    const editHandler = async (product) => {
        setEditValue(product.productName)
        setEditPrice(product.productPrice)
        setDataId(product.id)
    }
    const confirmEditHandler = async () => {
        let productDetails = {
            id: dataId,
            productName: editvalue,
            productPrice: editprice
        }
        console.log(productDetails);
        await axios.put(`https://mac-db-2b878-default-rtdb.firebaseio.com/products/${dataId}.json`, productDetails).then(
            (res) => {
                dispatch(UIActions.toggle())
                console.log('Eurika', res);
            }
        ).catch((e) => { console.log(e); })
    }

    return (
        <div className='row justify-content-center mt-5'>
            <div className="col-6">

                <form action="" className='form-control' onSubmit={addProductHandler}>
                    <label htmlFor="add">Add Product</label>
                    <input type="text" className='form-control' id='add' onChange={(e) => setValue(e.target.value)} value={value} />
                    <label htmlFor="addPrice">Add Price of the product</label>
                    <input type="text" className='form-control' id='addPrice' onChange={(e) => setPrice(e.target.value)} value={price} />
                    <button className='btn btn-info btn-sm mt-2' >Add</button>
                </form>
            </div>


            <div className='row '>
                {productData.map((product) =>
                    <div className="row justify-content-center" key={product.id}>
                        <div className="card col-6 my-3 w-25" >
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">{product.productPrice}</p>
                                <div className='mx-auto'>
                                    <button className='btn btn-sm btn-success mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editHandler(product)} >Edit</button>
                                    <button className='btn btn-sm btn-danger mx-2' onClick={() => deleteHandler(product.id)} >Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div >

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="add">Add Product</label>
                            <input type="text" className='form-control' id='add' onChange={(e) => setEditValue(e.target.value)} value={editvalue} />
                            <label htmlFor="addPrice">Add Price of the product</label>
                            <input type="text" className='form-control' id='addPrice' onChange={(e) => setEditPrice(e.target.value)} value={editprice} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={confirmEditHandler} data-bs-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard