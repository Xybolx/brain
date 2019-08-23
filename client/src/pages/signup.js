import React from 'react';
import { Col } from 'reactstrap';
import SignUpForm from '../components/signUpForm';
import PageLogo from '../components/pageLogo';

const SignUp = () => {

    return (
        <div style={{ marginTop: 30 }}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <PageLogo />
                <SignUpForm />
            </Col>
        </div>
    );
};

export default SignUp;