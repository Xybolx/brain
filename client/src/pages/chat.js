import React, { useState } from 'react';
import Messages from '../components/messages';
import Message from '../components/message';
import Users from '../components/users';
import Movie from '../components/movie';
import Movies from '../components/movies';
import PageTitle from '../components/pageTitle';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';

const Chat = () => {

    // State
    const [isOpen, setIsOpen] = useState(false);

    // toggle collapse function
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container>
            <PageTitle
                icon={<i className="fas fa-theater-masks" />}
                heading="Reviews"
            />
            <Row noGutters>
                <Col md="6" style={{ marginBottom: 30 }}>
                    <Container style={isOpen ? { display: 'none' } : { display: 'block' }}>
                        <Movies isOpen={isOpen} />
                    </Container>
                    <Button onClick={toggle} color="dark" size="md"><i className="fas fa-search" /> {isOpen ? "Close" : "Search"}</Button>
                    <Collapse isOpen={isOpen}>
                        <Movie toggle={toggle} />
                        </Collapse>
                </Col>
                <Col md="6" style={{ marginBottom: 30 }}>
                    <Users />
                    <Message />
                    <Messages />
                </Col>
            </Row>
        </Container>
    );
}

export default Chat;
