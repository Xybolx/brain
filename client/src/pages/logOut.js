import React, { useContext, useEffect } from 'react';
import { Col } from 'reactstrap';
import API from '../utils/API';
import UserContext from '../context/userContext';
import RoomContext from '../context/roomContext';
import PageLogo from '../components/logo/pageLogo';
import { Spinner } from '../components/spinner';

const LogOut = () => {

    // Context
    const { setUser } = useContext(UserContext);
    const { setRoom } = useContext(RoomContext);

    // Logout functions run on component mount
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
        <div className="page-container" style={{ marginTop: 30 }}>
            <PageLogo stackSize="8" />
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Spinner altMsg="El Fin" />
            </Col>
        </div>
    );
}

export default LogOut;