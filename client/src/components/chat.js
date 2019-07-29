import React from 'react';
import Messages from './messages';
import Message from './message';
import Users from './users';
import { Row, Col } from 'reactstrap';

const Chat = props => {

    return (
            <Row>
                <Col md="6">
                    <Users />
                </Col>
                <Col md="6">
                    <Messages />
                    <Message />
                </Col>
            </Row>
    );
}

export default Chat;
