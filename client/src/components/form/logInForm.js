import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useForm from './useForm';
import API from '../../utils/API';
import UserContext from '../../context/userContext';
import IsValidEmailContext from '../../context/isValidEmailContext';
import IsValidPasswordContext from '../../context/isValidPasswordContext';
import Btn from '../button/btn';
import InputLabel from './inputLabel';
import { Form, FormGroup, FormFeedback, Input } from 'reactstrap';

const LogInForm = () => {

    // Context
    const { setUser } = useContext(UserContext);
    const { isValidEmail, setIsValidEmail } = useContext(IsValidEmailContext);
    const { isValidPassword, setIsValidPassword } = useContext(IsValidPasswordContext);

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [values, handleChange, handleClearInputs] = useForm();

    // De-structure values
    const { email, password } = values;

    // Client-side validation
    useEffect(() => {
        const emailRegEx = /.+@.+\..+/;
        const emailMatch = emailRegEx.test(email);
        if (email && emailMatch) {
            setIsValidEmail(true);
        }
        if (!emailMatch) {
            setIsValidEmail(false);
        }
    }, [email, setIsValidEmail])

    useEffect(() => {
        const passwordRegEx = /^(?=[0-9a-zA-Z#@$?]{6,}$).*/;
        const passwordMatch = passwordRegEx.test(password);
        if (password && passwordMatch) {
            setIsValidPassword(true);
        }
        if (!passwordMatch) {
            setIsValidPassword(false);
        }
    }, [password, setIsValidPassword])

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
        if (email && password) {
            API.logIn({
                email,
                password
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
        <Form onSubmit={handleFormSubmit}>
            <FormGroup>
                <InputLabel
                    labelText="Email"
                />
                <Input
                    valid={isValidEmail}
                    invalid={!isValidEmail}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email || ""}
                    onChange={handleChange}
                    required
                />
                <FormFeedback
                    style={
                        isValidEmail
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                    valid={isValidEmail}
                >
                    Valid email!
                                </FormFeedback>
                <FormFeedback
                    style={
                        !isValidEmail
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                >
                    Enter a valid email!
                                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <InputLabel
                    labelText="Password"
                />
                <Input
                    valid={isValidPassword}
                    invalid={!isValidPassword}
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password || ""}
                    onChange={handleChange}

                    required
                />
                <FormFeedback
                    style={
                        isValidPassword
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                    valid={isValidPassword}
                >
                    Valid password!
                                </FormFeedback>
                <FormFeedback
                    style={
                        !isValidPassword
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                >
                    Minimum 6 characters!
                                </FormFeedback>
            </FormGroup>
            <Btn
                disabled={!isValidEmail || !isValidPassword}
                type="submit"
                color="dark"
                size="md"
                icon={<i className="fas fa-sign-in-alt" />}
                name="Log In"
            >
            </Btn>
        </Form>
    );
}

export default LogInForm;