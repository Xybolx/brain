import { useCallback, useContext } from 'react';
import UserContext from '../../context/userContext';
import API from '../../utils/API';
import useArray from './useArray';

const useAPI = () => {

    // context
    const { setUser } = useContext(UserContext);

    // state
    const [items, setItems] = useArray([]);
    const [messages, setMessages] = useArray([]);

    const getMessages = useCallback (() => {
        API.getMessages()
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [setMessages]);

    const getMovies = useCallback (() => {
        API.getMovies()
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
    }, [setItems]);

    const getUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    return {items, messages, getMessages, getMovies, getUser};

};

export default useAPI;