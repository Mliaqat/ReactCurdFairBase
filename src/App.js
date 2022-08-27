import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/Signup/SignUp";
import Alert from "./UI/Alert";
import axios from 'axios'
import { useEffect } from "react";
import { userDataActions } from "./store/UserDataSlice";
import { ProductActions } from "./store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom'
import Home from "./Components/Home/Home";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import UserDashboard from "./Components/User/UserDashboard";

function App() {
  const dispatch = useDispatch()
  const toggle = useSelector((state) => state.UI.toggle)

  useEffect(
    () => {
      const getData = async () => {
        const userData = [];
        await axios.get('https://mac-db-2b878-default-rtdb.firebaseio.com/users.json').then(
          (response) => {
            const data = response.data
            for (const key in data) {
              userData.push({
                id: key,
                firstName: data[key].firstName,
                lastName: data[key].lastName,
                email: data[key].email,
                password: data[key].password,
                isAdmin: data[key].isAdmin
              })
            }
          }
        ).catch(
          (error) => { console.log(error.message); }
        )
        dispatch(userDataActions.storeUserData(userData))
      }

      const getProducts = async () => {
        const productData = [];
        await axios.get('https://mac-db-2b878-default-rtdb.firebaseio.com/products.json').then(
          (response) => {
            const data = response.data
            for (const key in data) {
              productData.push({
                id: key,
                productName: data[key].productName,
                productPrice: data[key].productPrice,
              })
            }
          }
        ).catch(
          (error) => { console.log(error.message); }
        )
        dispatch(ProductActions.storeProductData(productData))

      }
      getData()
      getProducts()
    }, [dispatch, toggle])






  return (
    <div className="container-fluid">
      {/* <Alert status={'danger'} /> */}

      <Home />
      <Routes>
        <Route path="/" element={<SignUp />}>  </Route>
        <Route path="/admin" element={<AdminDashboard />} >  </Route>
        <Route path="/user" element={<UserDashboard />} >  </Route>
        <Route path="/login" element={<SignIn />}>  </Route>
      </Routes>
    </div>
  );
}

export default App;
