import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
const SignUp = () => {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.UserData.userData)
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminIsAvailable, setAdminIsAvailable] = useState(true)


    useEffect(() => {

        if (userData.find((obj) => obj.isAdmin === true)) {
            setAdminIsAvailable(false)
            console.log('admin is available');
        }
    }, [userData])

    const {
        value: firstNameValue,
        isValid: eneteredNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: firstNameReset
    } = useInput((value) => value.trim() !== '')
    // last name
    const {
        value: lastNameValue,
        isValid: eneteredLastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: lastNameReset
    } = useInput((value) => value.trim() !== '')

    //email
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput((value) => value.includes('@'))

    // password    
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput((value) => value.trim() !== '')
    // confirm Password
    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: confirmPasswordReset
    } = useInput((value) => value.trim() !== '')

    let matchingPass = false
    if (passwordValue === confirmPasswordValue) {
        matchingPass = true
    }

    let formIsValid = false
    if (eneteredNameIsValid && eneteredLastNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && matchingPass) {
        formIsValid = true
    }

    const formSubmitter = async (e) => {
        e.preventDefault();
        let id
        let signUpData = {
            id,
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue,
            isAdmin
        }

        await axios.post('https://mac-db-2b878-default-rtdb.firebaseio.com/users.json', signUpData).then(
            (response) => { console.log(response) }
        ).catch(
            (error) => { console.log(error) })


        firstNameReset()
        lastNameReset()
        emailReset()
        passwordReset()
        confirmPasswordReset()
            navigate('/login')
    }

    const setIsAdminHandler = () => {
        setIsAdmin(!isAdmin)
    }


    return (

        <div className="container">

            <form onSubmit={formSubmitter} className='form-control' >
                <div >
                    <h3>Sign Up</h3>


                    <div >
                        <label className='form-label' htmlFor="firstName">First Name</label>
                        <input className={firstNameHasError ? 'form-control is-invalid' : 'form-control'} type="text" id='firstName' value={firstNameValue}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler} />
                        {firstNameHasError && <p className='text-danger'> First Name should not be empty </p>}
                    </div>

                    <div >
                        <label className='form-label' htmlFor="lastName">Last Name</label>
                        <input className={lastNameHasError ? 'form-control is-invalid' : 'form-control'} type="text" id='lastName' value={lastNameValue}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler} />
                        {lastNameHasError && <p className='text-danger'> Last Name should not be empty </p>}
                    </div>

                    <div >
                        <label className='form-label' htmlFor="email">Email</label>
                        <input className={emailHasError ? 'form-control is-invalid' : `form-control `} type="email" id='email' value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler} />
                        {emailHasError && <p className='text-danger'> Email should not be empty </p>}
                    </div>

                    <div >
                        <label className='form-label' htmlFor="password">Password</label>
                        <input className={passwordHasError ? 'form-control is-invalid' : `form-control`} type="password" id='password' minLength={6} value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler} />
                        {passwordHasError && <p className='text-danger'> Password should not be empty </p>}
                    </div>

                    <div >
                        <label className='form-label' htmlFor="confirmPass">Confirm Password</label>
                        <input className={confirmPasswordHasError ? 'form-control is-invalid' : 'form-control'} type="password" id='confirmPass' minLength={6} value={confirmPasswordValue}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordBlurHandler} />
                        {confirmPasswordHasError && <p className='text-danger'> Password should not be empty </p>}
                        {confirmPasswordHasError && matchingPass && <p className='text-danger'> Password should Match </p>}
                    </div>
                    <button type='submit' className='btn btn-success my-4' disabled={!formIsValid} >Submit</button>
                </div>
                <div>
                </div>
                {adminIsAvailable && <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={setIsAdminHandler} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Is Admin?</label>
                </div>}
            </form>
        </div>
    )
}

export default SignUp