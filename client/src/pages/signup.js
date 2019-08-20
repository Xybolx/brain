import React from 'react';
import SignUpForm from '../components/signUpForm';
import { Col } from 'reactstrap';

const SignUp = () => {

    return (
        <div style={{ marginTop: 60 }}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <SignUpForm />
            </Col>
        </div>
    );
};

export default SignUp;