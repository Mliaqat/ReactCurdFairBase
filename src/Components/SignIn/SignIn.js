import React, { useState } from 'react'
import useInput from '../../hooks/useInput'
import { useSelector, useDispatch } from 'react-redux'
import { userDataActions } from '../../store/UserDataSlice'
import { useNavigate } from 'react-router-dom'
import Alert from '../../UI/Alert'

const SignIn = () => {
  const userData = useSelector((state) => state.UserData.userData)
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput((value) => value.trim() !== '')
  // last name
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset
  } = useInput((value) => value.trim() !== '')


  let formIsValid = false
  if (emailIsValid && passwordIsValid) {
    formIsValid = true
  }

  const formSubmitter = (e) => {
    e.preventDefault();
    let currentUser = userData.find(item => item.email === emailValue && item.password === passwordValue)
    if (currentUser) {
      dispatch(userDataActions.setCurrentUser(currentUser))
      currentUser.isAdmin ? navigate('/admin') : navigate('/user')
      setModal(false)
      emailReset()
      passwordReset()
    } else {
      setModal(true)
      throw new Error('something Went wrong')
    }
  }


  return (
    <div className="container">
      {modal && <Alert status={'danger'} messaage={' Email or password does not match !! '} ></Alert>}
      <form onSubmit={formSubmitter} className='form-control' >
        <div >
          <h3>Sign In</h3>

          <div >
            <label className='form-label' htmlFor="firstName">Email</label>
            <input className={emailHasError ? 'form-control is-invalid' : 'form-control'} type="email" id='firstName' value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler} />
            {emailHasError && <p className='text-danger'> Email should not be empty </p>}
          </div>

          <div >
            <label className='form-label' htmlFor="lastName">Password</label>
            <input className={passwordHasError ? 'form-control is-invalid' : 'form-control'} type="password" id='lastName' value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler} />
            {passwordHasError && <p className='text-danger'> Password should not be empty </p>}         </div>
          <button type='submit' className='btn btn-success my-4' disabled={!formIsValid} onClick={formSubmitter} >Submit</button>
        </div>
        <div>
        </div>
      </form>
    </div>
  )
}

export default SignIn











