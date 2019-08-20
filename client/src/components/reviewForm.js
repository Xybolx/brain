import React from 'react';
import { Input, InputGroup, InputGroupAddon, Form, FormGroup } from 'reactstrap';
import Btn from './btn';

const ReviewForm = ({ inputType, handleFormSubmit, placeholder, value, name, handleChange }) => {

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormGroup>
                <InputGroup>
                    <Input
                        type={inputType}
                        placeholder={placeholder}
                        value={value}
                        name={name}
                        onChange={handleChange}
                    />
                    <InputGroupAddon
                        addonType="append"
                    >
                        <Btn
                            type="submit"
                            color="dark"
                            icon={<i className="fas fa-paper-plane" />}
                        />
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    );
}

export default ReviewForm;