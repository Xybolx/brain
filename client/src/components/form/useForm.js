import { useState } from 'react';

const useForm = () => {

    const [state, setState] = useState({});

    const handleChange = ev => {
        ev.persist();
        const { name, value } = ev.target;
        setState(state => ({ ...state, [name]: value }))
    };

    const handleClearInputs = () => {
        setState({});
    };

    return [state, handleChange, handleClearInputs];

}

export default useForm;