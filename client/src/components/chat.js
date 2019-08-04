import React from 'react';
import Messages from './messages';
import Message from './message';
import Users from './users';
import Movie from './movie';
import Movies from './movies';
import { Container, Row, Col } from 'reactstrap';

const Chat = () => {

    return (
        <Container>
            <Row>
                <Col md="6">
                    <Movie />
                    <Movies />
                </Col>
                <Col md="6">
                    <Users />
                    <Messages />
                    <Message />
                </Col>
            </Row>
        </Container>
    );
}

export default Chat;
