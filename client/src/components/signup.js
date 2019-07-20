import React from 'react';
import SignUpForm from './signUpForm';
import { Col } from 'reactstrap';

const SignUp = () => {

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1>Sign Up</h1>
            <SignUpForm />
        </Col>
    );
};

export default SignUp;