import React from 'react';
import { Col } from 'reactstrap';
import SignUpForm from '../components/form/signUpForm';
import PageLogo from '../components/pageLogo';

const SignUp = () => {

    return (
        <div className="page-container" style={{ marginTop: 30 }}>
            <PageLogo stackSize="8" />
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <SignUpForm />
            </Col>
        </div>
    );
};

export default SignUp;