import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useForm from '../components/useForm';
import API from '../utils/API';
import UserContext from '../context/userContext';
import IsValidEmailContext from '../context/isValidEmailContext';
import IsValidPasswordContext from '../context/isValidPasswordContext';
import PageTitle from '../components/pageTitle';
import { Container, Button, Form, FormGroup, FormFeedback, Label, Input, Col } from 'reactstrap';

const LogIn = () => {

    // Context
    const { setUser } = useContext(UserContext);
    const { isValidEmail } = useContext(IsValidEmailContext);
    const { isValidPassword } = useContext(IsValidPasswordContext);

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [values, handleChange] = useForm({
        email: '',
        password: ''
    });

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
                .then(() => redirect())
                .catch(err => console.log(err))
        }
    };

    // Redirect to chat when user is logged in
    if (isLoggedIn) {
        return <Redirect to="/chat" />
    }

    return (
        <Container>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <PageTitle
                    icon={<i className="fas fa-sign-in-alt" />}
                    heading="Log In"
                />
                <Form style={{ textAlign: "left" }} onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label style={{ marginLeft: 5 }} htmlFor="emailInput">Email</Label>
                        <Input valid={isValidEmail} invalid={!isValidEmail} type="email" name="email" placeholder="Enter Email" value={values.email} onChange={handleChange} id="emailInput" required />
                        <FormFeedback style={isValidEmail ? { display: 'block', marginLeft: 5 } : { display: 'none' }} valid={isValidEmail}>Valid email!</FormFeedback>
                        <FormFeedback style={!isValidEmail ? { display: 'block', marginLeft: 5 } : { display: 'none' }}>Enter a valid email!</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ marginLeft: 5 }} htmlFor="passwordInput">Password</Label>
                        <Input valid={isValidPassword} invalid={!isValidPassword} type="password" name="password" placeholder="Enter Password" value={values.password} onChange={handleChange} id="passwordInput" required />
                        <FormFeedback style={isValidPassword ? { display: 'block', marginLeft: 5 } : { display: 'none' }} valid={isValidPassword}>Valid password!</FormFeedback>
                        <FormFeedback style={!isValidPassword ? { display: 'block', marginLeft: 5 } : { display: 'none' }} >Minimum 6 characters!</FormFeedback>
                    </FormGroup>
                    <Button disabled={!isValidEmail && !isValidPassword} type="submit" color="dark" size="md" block><i className="fas fa-sign-in-alt" /> Login</Button>
                </Form>
            </Col>
        </Container>
    );
};

export default LogIn;