import React, { useState, useMemo, useEffect } from 'react';
import API from '../utils/API';
import Reviews from '../components/reviews';
import Review from '../components/review';
import Users from '../components/users';
import MovieSearch from '../components/movieSearch';
import Movies from '../components/movies';
import Title from '../components/title';
import Btn from '../components/btn';
import { Row, Col, Collapse } from 'reactstrap';

const UserReviews = () => {

    // State
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Memo
    useMemo(() => ({ messages, setMessages }), [messages, setMessages]);

    // toggle collapse/getMessages functions
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const getMessages = () => {
        API.getMessages()
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div style={{ marginTop: 5 }}>
            <Row>
                <Col
                    className="jumbotron jumbotron-fluid left"
                    md="6"
                    style={{ marginBottom: 30 }}
                >
                    <div
                        style={
                            isOpen
                                ? { display: 'none' }
                                : { display: 'block' }}
                    >
                        <Movies messages={messages} />
                    </div>
                    <Collapse isOpen={isOpen}>
                        <MovieSearch toggle={toggle} />
                    </Collapse>
                    <Btn
                        onClick={toggle}
                        color="dark"
                        size="md"
                        icon={<i className="fas fa-search" />}
                        name={isOpen ? "Close" : "Search"}
                    >
                    </Btn>
                </Col>
                <Col
                    className="jumbotron jumbotron-fluid right"
                    md="6"
                    style={{ marginBottom: 30 }}
                >
                    <Users />
                    <Review />
                    <Reviews messages={messages} getMessages={getMessages} />
                </Col>
            </Row>
        </div>
    );
}

export default UserReviews;
