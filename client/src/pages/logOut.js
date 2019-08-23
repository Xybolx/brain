import React, { useContext, useEffect } from 'react';
import { Col } from 'reactstrap';
import API from '../utils/API';
import UserContext from '../context/userContext';
import RoomContext from '../context/roomContext';
import PageLogo from '../components/pageLogo';
import Title from '../components/title';

const LogOut = () => {

    // Context
    const { setUser } = useContext(UserContext);
    const { setRoom } = useContext(RoomContext);

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
                .then(res => window.location = "/")
                .catch(err => console.log(err))
        };
        logOut();
    }, []);

    return (
        <div style={{ marginTop: 30 }}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <PageLogo />
                <Title
                    header="LOG OUT"
                />
            </Col>
        </div>
    );
}

export default LogOut;