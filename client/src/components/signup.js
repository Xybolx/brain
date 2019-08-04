import React from 'react';
import SignUpForm from './signUpForm';
import { Container, Col } from 'reactstrap';

const SignUp = () => {

    return (
        <Container>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <h2><i className="fas fa-user-plus" /> Sign Up</h2>
                <SignUpForm />
            </Col>
        </Container>
    );
};

export default SignUp;