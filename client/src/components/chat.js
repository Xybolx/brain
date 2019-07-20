import React from 'react';
import Messages from './messages';
import Users from './users';
import { Row, Col } from 'reactstrap';

const Chat = () => {

    return (
        <Row>
            <Col md="6">
                <Users />
            </Col>
            <Col md="6">
                <Messages />
            </Col>
        </Row>
    );
}

export default Chat;
