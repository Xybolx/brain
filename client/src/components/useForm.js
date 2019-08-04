import { useState, useEffect, useContext } from 'react';
import IsValidEmailContext from './context/isValidEmailContext';
import IsValidPasswordContext from './context/isValidPasswordContext';
import IsValidUsernameContext from './context/isValidUsernameContext';

const useForm = initialValues => {

    // Context
    const { setIsValidEmail } = useContext(IsValidEmailContext);
    const { setIsValidPassword } = useContext(IsValidPasswordContext);
    const { setIsValidUsername } = useContext(IsValidUsernameContext);

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
            if (!emailMatch) {
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
            if (!passwordMatch) {
                console.log(passwordMatch);
                setIsValidPassword(false);
            }
        }, [values.password, setIsValidPassword]),

        useEffect(() => {
            const username = values.username;
            const usernameRegEx = /^(?=[0-9a-zA-Z#@$?]{2,}$).*/;
            const usernameMatch = usernameRegEx.test(username);
            if (username && usernameMatch) {
                console.log(usernameMatch);
                setIsValidUsername(true);
            }
            if (!usernameMatch) {
                console.log(usernameMatch);
                setIsValidUsername(false);
            }
        }, [values.username, setIsValidUsername])
    ];
}

export default useForm;