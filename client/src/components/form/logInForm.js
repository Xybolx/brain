import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useForm from './useForm';
import useValidate from '../hooks/useValidate';
import API from '../../utils/API';
import UserContext from '../../context/userContext';
import Btn from '../button/btn';
import InputLabel from './inputLabel';
import { Form, FormGroup, FormFeedback, Input } from 'reactstrap';

const LogInForm = () => {

    // Context
    const { setUser } = useContext(UserContext);

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [values, handleChange, handleClearInputs] = useForm();
    const errors = useValidate(values);

    // De-structure values
    const { email, password } = values;

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

    // Redirect to reviews when user is logged in
    if (isLoggedIn) {
        return <Redirect to="/reviews" />
    }

    return (
        <Form className="login-form" onSubmit={handleFormSubmit}>
            <FormGroup>
                <InputLabel
                    labelText="Email"
                />
                <Input
                    valid={email && errors.isValidEmail}
                    invalid={email && !errors.isValidEmail}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email || ""}
                    onChange={handleChange}
                    required
                />
                <FormFeedback
                    style={
                        email &&
                        errors.isValidEmail
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                    valid={errors.isValidEmail}
                >
                    Valid email!
                                </FormFeedback>
                <FormFeedback
                    style={
                        email &&
                        !errors.isValidEmail
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
                    valid={password && errors.isValidPassword}
                    invalid={password && !errors.isValidPassword}
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password || ""}
                    onChange={handleChange}
                    required
                />
                <FormFeedback
                    style={
                        password && 
                        errors.isValidPassword
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                    valid={errors.isValidPassword}
                >
                    Valid password!
                                </FormFeedback>
                <FormFeedback
                    style={
                        password &&
                        !errors.isValidPassword
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                >
                    Minimum 6 characters!
                                </FormFeedback>
            </FormGroup>
            <Btn
                disabled={!errors.isValidEmail || !errors.isValidPassword}
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