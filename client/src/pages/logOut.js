import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Col } from 'reactstrap';
import UserContext from '../context/userContext';
import RoomContext from '../context/roomContext';
import API from '../utils/API';
import Title from '../components/title';

const LogOut = () => {

    // Context
    const { setUser } = useContext(UserContext);
    const { setRoom } = useContext(RoomContext);

    // State
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    // Re-direct
    const redirect = () => {
        setTimeout(() => setIsLoggedOut(true), 1000);
    };

    // Logout function runs on component mount
    useEffect(() => {
        setRoom(null);
    }, [setRoom])

    useEffect(() => {
        setUser(null)
    }, [setUser])

    useEffect(() => {
        const logOut = () => {
            API.logOut()
                .then(() => redirect())
                .catch(err => console.log(err))
        };
        logOut();
    }, [setUser, setRoom]);

    // When user is logged out redirect to home
    if (isLoggedOut) {
        return <Redirect to="/" />
    }

    return (
        <div style={{ marginTop: 60 }}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Title
                    header="Log Out"
                />
            </Col>
        </div>
    );
}

export default LogOut;