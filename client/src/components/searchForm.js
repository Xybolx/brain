import React from 'react';
import { Input, InputGroup, InputGroupAddon, Form, FormGroup } from 'reactstrap';
import Btn from './btn';

const SearchForm = props => {

    return (
        <Form onSubmit={props.handleFormSubmit}>
            <FormGroup>
                <InputGroup>
                    <Input
                        type={props.inputType}
                        placeholder={props.placeholder}
                        value={props.value}
                        name={props.name}
                        onChange={props.handleChange}
                    />
                    <InputGroupAddon
                        addonType="append"
                    >
                        <Btn
                            type="submit"
                            color="dark"
                            icon={<i className="fas fa-search" />}
                        />
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    );
}

export default SearchForm;