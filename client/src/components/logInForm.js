import React, { useContext } from 'react';
import IsValidEmailContext from '../context/isValidEmailContext';
import IsValidPasswordContext from '../context/isValidPasswordContext';
import Title from '../components/title';
import Btn from '../components/btn';
import { Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

const LogInForm = ({ handleFormSubmit, emailValue, handleEmailChange, passwordValue, handlePasswordChange }) => {

    // Context
    const { isValidEmail } = useContext(IsValidEmailContext);
    const { isValidPassword } = useContext(IsValidPasswordContext);

    return (
        <Form onSubmit={handleFormSubmit}>
            <Title
                header="Log In"
            />
            <FormGroup>
                <Label
                    className="label"
                >
                    Email
                            </Label>
                <Input
                    valid={isValidEmail}
                    invalid={!isValidEmail}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={emailValue}
                    onChange={handleEmailChange}
                    required
                />
                <FormFeedback
                    style={
                        isValidEmail
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                    valid={isValidEmail}
                >
                    Valid email!
                                </FormFeedback>
                <FormFeedback
                    style={
                        !isValidEmail
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                >
                    Enter a valid email!
                                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label
                    className="label"
                >
                    Password
                            </Label>
                <Input
                    valid={isValidPassword}
                    invalid={!isValidPassword}
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={passwordValue}
                    onChange={handlePasswordChange}
    
                    required
                />
                <FormFeedback
                    style={
                        isValidPassword
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                    valid={isValidPassword}
                >
                    Valid password!
                                </FormFeedback>
                <FormFeedback
                    style={
                        !isValidPassword
                            ? { display: 'block', marginLeft: 5 }
                            : { display: 'none' }}
                >
                    Minimum 6 characters!
                                </FormFeedback>
            </FormGroup>
            <Btn
                disabled={!isValidEmail && !isValidPassword}
                type="submit"
                color="dark"
                size="md"
                icon={<i className="fas fa-sign-in-alt" />}
                name="Log In"
            >
            </Btn>
        </Form>
    );
}

export default LogInForm;