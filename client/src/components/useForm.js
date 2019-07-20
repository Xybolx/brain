import { useState, useEffect, useContext } from 'react';
import IsValidEmailContext from './isValidEmailContext';
import IsValidPasswordContext from './isValidPasswordContext';

export const useForm = (initialValues) => {

    const [values, setValues] = useState(initialValues);

    const { setIsValidEmail } = useContext(IsValidEmailContext);

    const { setIsValidPassword } = useContext(IsValidPasswordContext);

    return [
        values,
        ev => {
            setValues({
                ...values,
                [ev.target.name]: ev.target.value
            });
        },
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
                    setIsValidEmail(null);
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
                    setIsValidPassword(null);
                }
            }, [values.password, setIsValidPassword])
    ];
};