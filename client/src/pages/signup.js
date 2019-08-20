import React from 'react';
import SignUpForm from '../components/signUpForm';
import { Col } from 'reactstrap';

const SignUp = () => {

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <SignUpForm />
        </Col>
    );
};

export default SignUp;