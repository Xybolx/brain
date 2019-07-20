import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from './useForm';
import API from '../utils/API';
import UserContext from './userContext';
import IsValidEmailContext from './isValidEmailContext';
import IsValidPasswordContext from './isValidPasswordContext';
import { Button, Form, FormGroup, FormFeedback, FormText, Label, Input, Col } from 'reactstrap';

const LogIn = () => {

    const { setUser } = useContext(UserContext);

    const { isValidEmail } = useContext(IsValidEmailContext);

    const { isValidPassword } = useContext(IsValidPasswordContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [values, handleChange] = useForm({
        email: '',
        password: ''
    });

    const loadUser = async () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    const redirect = async () => {
        setTimeout(() => setIsLoggedIn(true), 1000);
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
                    <FormFeedback style={ isValidEmail === true ? {display: 'block', marginLeft: 5} : {display: 'none'}} valid={isValidEmail} invalid={isValidEmail === null}>Valid Email!</FormFeedback>
                    <FormFeedback style={ isValidEmail === null ? {display: 'block', marginLeft: 5} : {display: 'none'}} invalid={isValidEmail === null}>Enter A Valid Email!</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label style={{ marginLeft: 5 }} htmlFor="passwordInput">Password</Label>
                    <Input valid={isValidPassword}invalid={!isValidPassword} type="password" name="password" placeholder="Enter Password" value={values.password} onChange={handleChange} id="passwordInput" required />
                    <FormFeedback style={ isValidPassword === true ? {display: 'block', marginLeft: 5} : {display: 'none'}} valid={isValidPassword} invalid={isValidPassword === null}>Valid Password!</FormFeedback>
                    <FormFeedback style={ isValidPassword === null ? {display: 'block', marginLeft: 5} : {display: 'none'}} invalid={isValidPassword === null}>Minimum 6 Characters!</FormFeedback>
                </FormGroup>
                <Button type="submit" color="info" size="lg" outline block>Submit</Button>
            </Form>
        </Col>
    );
};

export default LogIn;