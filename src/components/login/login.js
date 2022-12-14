import React, { useContext, useState } from 'react';
import '../sign-up/sign-up.css'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../axios config/axiosInstance';
import { useHistory } from 'react-router-dom';


import { FaFacebookSquare, FaApple } from 'react-icons/fa';
import { FiSmartphone } from 'react-icons/fi';

import { FcGoogle, } from 'react-icons/fc';
import { loginContext } from '../../contexts/loginModel';




const Login = () => {

    const { showLogin, setShowLogin } = useContext(loginContext)
    const handleCloseLogin = () => setShowLogin(false)




    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
    })



    const handleInputChange = (evt) => {
        let emailRegex = /^[A-Za-z0-9]{3,}@(gmail|yahoo|outlook).com$/
        let PassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/


        if (evt.target.name === "email") {

            setUserLogin({ ...userLogin, email: evt.target.value })

            setErrors({
                ...errors, emailError: (evt.target.value.length === 0) ?
                    " This field is required." : (!emailRegex.test(evt.target.value)) ?
                        " Invalid Email format." : ""
            })
        } else if (evt.target.name === "password") {

            setUserLogin({ ...userLogin, password: evt.target.value })

            setErrors({
                ...errors, passwordError: (evt.target.value.length === 0) ?
                    " Password is required" : (!PassRegex.test(evt.target.value)) ?
                        " Password must be at least 8 characters, contains at least one uppercase , one lowercase letter,one special char.  " : ""
            })
        }

    }



    const history = useHistory()

    const handleForm = (ev) => {
        ev.preventDefault();
        if (!errors.emailError && !errors.passwordError) {

            axiosInstance.post('/users/login', userLogin).then((res) => {
                console.log(res);
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);

                    setShowLogin(false)
                    // ev.target.submit()
                    history.push('/')
                    // alert("Form Sent Successfully")
                }
            }).catch((err) => {
            })
        } else {
            alert("Please Enter Valid Date")
        }
    }









    return (



        <div className=''>

            <Modal show={showLogin} onHide={handleCloseLogin} className=""
            // size="lg"
            // aria-labelledby="contained-modal-title-vcenter"
            // centered
            >
                <Modal.Body style={{ borderRadius: '2rem' }} className="">
                    <div className="signup-container ">
                        <div className="finish-signup p-0">
                            <h5 className="text-center">Log in </h5>
                        </div>
                        <form onSubmit={(e) => { handleForm(e) }} className=" " method='GET' >
                            <h4 className='pb-2'>Welcome to Airbnb</h4>
                            <div className='pb-2'>
                                <div className={`input-container ${(errors.emailError ? "border-danger shadow-none" : "")}`}>
                                    <input type="text" className={` ${(errors.emailError ? "border-danger shadow-none" : "")}`}
                                        value={userLogin.email}
                                        name="email"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder="Email"
                                    />
                                </div>
                                <p className={`error ${!errors.emailError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "></i>{errors.emailError}</p>
                            </div>


                            <div>
                                <div className={` input-container ${(errors.passwordError ? "border-danger shadow-none" : "")}`}>

                                    <input type="text"
                                        value={userLogin.password}
                                        name="password"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder="password"
                                    />
                                </div>
                                <p className={`error ${!errors.passwordError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "></i>{errors.passwordError}</p>
                            </div>
                            <br />

                            <input
                                type="submit"
                                className="agree-btn"
                                value=" continue"
                                name="submit-btn"
                            />


                            <div>
                                <div className="row" style={{ marginLeft: '20px', marginTop: '30px' }} >
                                    <div className="col-5" style={{ padding: 0 }}>
                                        <hr />
                                    </div>
                                    <div className="col-1" style={{ padding: 0, textAlign: 'center' }}>
                                        or
                                    </div>
                                    <div className="col-5" style={{ padding: 0 }}>
                                        <hr />
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className="social-login__btn">
                                    <div className="facebook-container">
                                        <div className="facebook-icon-container ">
                                            <FaFacebookSquare
                                                style={{
                                                    fontSize: '1.4rem',
                                                    color: '#1873eb',
                                                }}
                                            />
                                        </div>
                                        <div className="facebook-text-container">
                                            Continue With Facebook
                                        </div>
                                    </div>
                                </div>



                                <div

                                    className="social-login__btn "
                                >
                                    <div className="google-container">
                                        <div className="google-icon-container">
                                            <FcGoogle style={{ fontSize: '1.4rem' }} />
                                        </div>
                                        <div className="google-text-container">
                                            Continue With Google
                                        </div>
                                    </div>
                                </div>

                                <div className="social-login__btn">
                                    <div className="apple-container">
                                        <div className="apple-icon-container">
                                            <FaApple
                                                style={{
                                                    fontSize: '1.4rem',
                                                }}
                                            />
                                        </div>
                                        <div className="apple-text-container">Continue With Apple</div>
                                    </div>
                                </div>


                                <div className="social-login__btn">
                                    <div className="email-container">
                                        <div className="email-icon-container">
                                            < FiSmartphone style={{ fontSize: '1.4rem' }} />
                                        </div>
                                        <div className="email-text-container">Continue With Phone</div>
                                    </div>
                                </div>
                            </div>



                        </form >
                    </div>
                </Modal.Body >
            </Modal >
        </div >

    );
}

export default Login;
