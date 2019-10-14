import { useState, useEffect } from "react";

const useValidate = values => {

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);

    useEffect(() => {
        const emailRegEx = /.+@.+\..+/;
        const emailMatch = emailRegEx.test(values.email);
        const passwordRegEx = /^(?=[0-9a-zA-Z#@$?]{6,}$).*/;
        const passwordMatch = passwordRegEx.test(values.password);
        const usernameRegEx = /^(?=[0-9a-zA-Z#@$?]{2,}$).*/;
        const usernameMatch = usernameRegEx.test(values.username);
        
        if (values.email && emailMatch) {
            setIsValidEmail(true);
        } else if (values.email && !emailMatch) {
            setIsValidEmail(false);
        }

        if (values.password && passwordMatch) {
            setIsValidPassword(true);
        } else if (values.password && !passwordMatch) {
            setIsValidPassword(false);
        }

        if (values.username && usernameMatch) {
            setIsValidUsername(true);
        } else if (values.username && !usernameMatch) {
            setIsValidUsername(false);
        }
    }, [setIsValidEmail, setIsValidPassword, setIsValidUsername, values.email, values.password, values.username]);

    return [isValidEmail, isValidPassword, isValidUsername];
    
};

export default useValidate;