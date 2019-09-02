import React from 'react';
import { Col } from 'reactstrap';
import LogInForm from '../components/form/logInForm';
import PageLogo from '../components/pageLogo';

const LogIn = () => {

    return (
        <div className="page-container" style={{ marginTop: 30 }}>
            <PageLogo stackSize="8" />
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <LogInForm />
            </Col>
        </div>
    );
};

export default LogIn;