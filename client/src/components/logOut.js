import React, { useContext, useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import UserContext from './userContext';
import API from '../utils/API';

const LogOut = () => {

    const { setUser } = useContext(UserContext);

    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const redirect = () => {
        setTimeout(() => setIsLoggedOut(true), 1000);
    };

    useEffect(() => {
        const logOut = () => {
            API.logOut()
            .then(res => setUser(null))
            .then(() => redirect())
            .catch(err => console.log(err))
        };
        logOut();
    }, [setUser]);

    if (isLoggedOut === true) {
        window.location.pathname = "/"
    }

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1>Logging Out...</h1>
        </Col>
    );
}

export default LogOut;