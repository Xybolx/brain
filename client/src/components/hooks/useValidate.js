import { useState, useEffect } from "react";

const useValidate = values => {

    const [errors, setErrors] = useState({
        isValidEmail: false,
        isValidPassword: false,
        isValidUsername: false
    });

    useEffect(() => {
        const emailRegEx = /.+@.+\...+/;
        const emailMatch = emailRegEx.test(values.email);
        const passwordRegEx = /^(?=[0-9a-zA-Z#@$?]{6,}$).*/;
        const passwordMatch = passwordRegEx.test(values.password);
        const usernameRegEx = /^(?=[0-9a-zA-Z#@$?]{2,}$).*/;
        const usernameMatch = usernameRegEx.test(values.username);

        if (values.email && emailMatch) {
            setErrors((errors => ({ ...errors, isValidEmail: true })))
        } else if (!emailMatch) {
            setErrors((errors => ({ ...errors, isValidEmail: false })))            
        }

        if (values.password && passwordMatch) {
            setErrors((errors => ({ ...errors, isValidPassword: true })))            
        } else if (!passwordMatch) {
            setErrors((errors => ({ ...errors, isValidPassword: false })))                        
        }

        if (values.username && usernameMatch) {
            setErrors((errors => ({ ...errors, isValidUsername: true })))                        
        } else if (!usernameMatch) {
            setErrors((errors => ({ ...errors, isValidUsername: false })))                                    
        }
    }, [values]);

    return errors;

};

export default useValidate;