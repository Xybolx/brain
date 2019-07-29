import { useState, useEffect, useContext } from 'react';
import IsValidEmailContext from './isValidEmailContext';
import IsValidPasswordContext from './isValidPasswordContext';

export const useForm = initialValues => {

    // State
    const [values, setValues] = useState(initialValues);

    // Keep values, handleChange
    return [
        values,
        ev => {
            const { name, value } = ev.target;
            setValues({
                ...values,
                [name]: value
            });
        }
    ];
}

export const useValidation = initialValues => {

    // Context
    const { setIsValidEmail } = useContext(IsValidEmailContext);
    const { setIsValidPassword } = useContext(IsValidPasswordContext);

    // State
    const [values, setValues] = useState(initialValues);

    // Keep values, handleChange
    return [
        values,
        ev => {
            const { name, value } = ev.target;
            setValues({
                ...values,
                [name]: value
            });
        },

        // Client-side validation
        useEffect(() => {
            const email = values.email;
            const emailRegEx = /.+@.+\..+/;
            const emailMatch = emailRegEx.test(email);
            if (email && emailMatch) {
                console.log(emailMatch);
                setIsValidEmail(true);
            }
            if (email && !emailMatch) {
                console.log(emailMatch);
                setIsValidEmail(false);
            }
        }, [values.email, setIsValidEmail]),

        useEffect(() => {
            const password = values.password;
            const passwordRegEx = /^(?=[0-9a-zA-Z#@$?]{6,}$).*/;
            const passwordMatch = passwordRegEx.test(password);
            if (password && passwordMatch) {
                console.log(passwordMatch);
                setIsValidPassword(true);
            }
            if (password && !passwordMatch) {
                console.log(passwordMatch);
                setIsValidPassword(false);
            }
        }, [values.password, setIsValidPassword])
    ];
}