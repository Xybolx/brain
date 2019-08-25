import React from 'react';
import { Input, InputGroup, InputGroupAddon, Form, FormGroup } from 'reactstrap';
import Btn from '../button/btn';

const InputFormGroup = ({ handleFormSubmit, inputType, placeholder, value, name, handleChange, btnIcon }) => {

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
                            disabled={!value}
                            icon={btnIcon}
                        />
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    );
}

export default InputFormGroup;