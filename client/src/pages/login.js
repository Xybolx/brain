import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useInput from '../components/useInput';
import API from '../utils/API';
import UserContext from '../context/userContext';
import IsValidEmailContext from '../context/isValidEmailContext';
import IsValidPasswordContext from '../context/isValidPasswordContext';
import LogInForm from '../components/logInForm';
import { Col } from 'reactstrap';

const LogIn = () => {

    // Context
    const { setUser } = useContext(UserContext);
    const { setIsValidEmail } = useContext(IsValidEmailContext);
    const { setIsValidPassword } = useContext(IsValidPasswordContext);

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [values, handleChange, handleClearInputs] = useInput();

    useEffect(() => {
        const email = values.email;
        const emailRegEx = /.+@.+\..+/;
        const emailMatch = emailRegEx.test(email);
        if (email && emailMatch) {
            console.log(emailMatch);
            setIsValidEmail(true);
        }
        if (!emailMatch) {
            console.log(emailMatch);
            setIsValidEmail(false);
        }
    }, [values.email, setIsValidEmail])

        useEffect(() => {
            const password = values.password;
            const passwordRegEx = /^(?=[0-9a-zA-Z#@$?]{6,}$).*/;
            const passwordMatch = passwordRegEx.test(password);
            if (password && passwordMatch) {
                console.log(passwordMatch);
                setIsValidPassword(true);
            }
            if (!passwordMatch) {
                console.log(passwordMatch);
                setIsValidPassword(false);
            }
        }, [values.password, setIsValidPassword])

    // Get user and redirect function
    const getUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    const redirect = () => {
        setTimeout(() => setIsLoggedIn(true), 1000);
    };

    // Handle form submit
    const handleFormSubmit = ev => {
        ev.preventDefault();
        if (values.email
            && values.password) {
            API.logIn({
                email: values.email,
                password: values.password
            })
                .then(res => getUser())
                .then(() => handleClearInputs())
                .then(() => redirect())
                .catch(err => console.log(err))
        }
    };

    // Redirect to chat when user is logged in
    if (isLoggedIn) {
        return <Redirect to="/reviews" />
    }

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <LogInForm
                handleFormSubmit={handleFormSubmit}
                emailValue={values.email || ""}
                handleEmailChange={handleChange}
                passwordValue={values.password || ""}
                handlePasswordChange={handleChange}
            />
        </Col>
    );
};

export default LogIn;