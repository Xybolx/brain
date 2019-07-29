import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useValidation } from './useForm';
import API from '../utils/API';
import UserContext from './userContext';
import IsValidEmailContext from './isValidEmailContext';
import IsValidPasswordContext from './isValidPasswordContext';
import { Button, Form, FormGroup, FormFeedback, Label, Input, Col } from 'reactstrap';

const LogIn = () => {

    // Context
    const { setUser } = useContext(UserContext);
    const { isValidEmail } = useContext(IsValidEmailContext);
    const { isValidPassword } = useContext(IsValidPasswordContext);

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [values, handleChange] = useValidation({
        email: '',
        password: ''
    });

    const loadUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    const redirect = () => {
        setTimeout(() => setIsLoggedIn(true), 2000);
    };

    const handleFormSubmit = ev => {
        ev.preventDefault();
        if (values.email
            && values.password) {
            API.logIn({
                email: values.email,
                password: values.password
            })
                .then(res => loadUser())
                .then(() => redirect())
                .catch(err => console.log(err))
        };
    };

    if (isLoggedIn === true) {
        return <Redirect to="/chat" />
    }

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1>Log In</h1>
            <Form style={{ textAlign: "left" }} onSubmit={handleFormSubmit}>
                <FormGroup>
                    <Label style={{ marginLeft: 5 }} htmlFor="emailInput">Email</Label>
                    <Input valid={isValidEmail} invalid={!isValidEmail} type="email" name="email" placeholder="Enter Email" value={values.email} onChange={handleChange} id="emailInput" required />
                    <FormFeedback style={ isValidEmail ? {display: 'block', marginLeft: 5} : {display: 'none'}} valid={isValidEmail}>Valid Email!</FormFeedback>
                    <FormFeedback style={ !isValidEmail ? {display: 'block', marginLeft: 5} : {display: 'none'}}>Enter A Valid Email!</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label style={{ marginLeft: 5 }} htmlFor="passwordInput">Password</Label>
                    <Input valid={isValidPassword}invalid={!isValidPassword} type="password" name="password" placeholder="Enter Password" value={values.password} onChange={handleChange} id="passwordInput" required />
                    <FormFeedback style={ isValidPassword ? {display: 'block', marginLeft: 5} : {display: 'none'}} valid={isValidPassword}>Valid Password!</FormFeedback>
                    <FormFeedback style={ !isValidPassword ? {display: 'block', marginLeft: 5} : {display: 'none'}} >Minimum 6 Characters!</FormFeedback>
                </FormGroup>
                <Button type="submit" color="info" size="md" outline block>Submit</Button>
            </Form>
        </Col>
    );
};

export default LogIn;