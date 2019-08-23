import React from 'react';
import { Col } from 'reactstrap';
import LogInForm from '../components/logInForm';
import PageLogo from '../components/pageLogo';

const LogIn = () => {

    return (
        <div style={{ marginTop: 30 }}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <PageLogo />
                <LogInForm />
            </Col>
        </div>
    );
};

export default LogIn;