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
        <div>
            <PageTitle
                icon={<i className="fas fa-theater-masks" />}
                heading="Reviews"
            />
            <Row noGutters>
                <Col className="jumbotron jumbotron-fluid left" md="6" style={{ marginBottom: 30 }}>
                    <div style={isOpen ? { display: 'none' } : { display: 'block' }}>
                        <Movies isOpen={isOpen} />
                    </div>
                    <Collapse isOpen={isOpen}>
                        <Movie toggle={toggle} />
                    </Collapse>
                    <Button onClick={toggle} color="dark" size="md"><i className="fas fa-search" /> {isOpen ? "Close" : "Search"}</Button>
                </Col>
                <Col className="jumbotron jumbotron-fluid right" md="6" style={{ marginBottom: 30 }}>
                    <Users />
                    <Message />
                    <Messages />
                </Col>
            </Row>
        </div>
    );
}

export default Chat;
