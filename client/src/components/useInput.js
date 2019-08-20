import { useState, useContext } from 'react';
import IsValidEmailContext from '../context/isValidEmailContext';
import IsValidPasswordContext from '../context/isValidPasswordContext';
import IsValidUsernameContext from '../context/isValidUsernameContext';

const useInput = () => {

    // context
    const { setIsValidEmail } = useContext(IsValidEmailContext);
    const { setIsValidPassword } = useContext(IsValidPasswordContext);
    const { setIsValidUsername } = useContext(IsValidUsernameContext);

    const [state, setState] = useState({});

    const handleChange = ev => {
        ev.persist();
        setState(state => ({ ...state, [ev.target.name]: ev.target.value }))
    };

    const handleClearInputs = () => {
        setState({});
        setIsValidEmail(false);
        setIsValidPassword(false);
        setIsValidUsername(false);
    };

    return [state, handleChange, handleClearInputs];

}

export default useInput;