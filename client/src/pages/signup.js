import React from 'react';
import SignUpForm from '../components/signUpForm';
import PageTitle from '../components/pageTitle';
import { Container, Col } from 'reactstrap';

const SignUp = () => {

    return (
        <Container>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <PageTitle
                    icon={<i className="fas fa-user-plus" />}
                    heading="Sign Up"
                />
                <SignUpForm />
            </Col>
        </Container>
    );
};

export default SignUp;