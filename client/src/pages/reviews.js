import React, { useEffect } from 'react';
import Reviews from '../components/review/reviews';
import Review from '../components/review/review';
import Users from '../components/users/users';
import MovieSearch from '../components/movie/movieSearch';
import Movies from '../components/movie/movies';
import useSpeech from '../components/hooks/useSpeech';
import useBoolean from '../components/hooks/useBoolean';
import useAPI from '../components/hooks/useAPI';
import Btn from '../components/button/btn';
import { Row, Col, Collapse } from 'reactstrap';

const UserReviews = () => {

    // State
    const state = useSpeech("Welcome to film brains");
    const [isOpen, toggleCollapse] = useBoolean(false);
    const { items, messages, getMessages, getMovies } = useAPI();

    // Get and set state
    useEffect(() => {
        getMovies();
    }, [getMovies]);

    useEffect(() => {
        getMessages();
    }, [getMessages]);

    return (
        <div className="container-page">
            <pre style={{ display: "none" }}>{JSON.stringify(state, null, 2)}</pre>
            <Row>
                <Col
                    className="jumbotron jumbotron-fluid left"
                    md="6"
                >
                    <div style={
                        isOpen 
                            ? { display: "none" }
                            : { display: "block" }}
                    >
                        <Movies
                            messages={messages}
                            getMessages={getMessages}
                            items={items}
                            getMovies={getMovies}
                        />
                    </div>
                    <Collapse isOpen={isOpen}>
                        <div
                            style={
                                isOpen
                                    ? { display: "block" }
                                    : { display: "none" }}
                        >
                            <MovieSearch
                                toggleCollapse={toggleCollapse}
                            />
                        </div>
                    </Collapse>
                        <Btn
                            onClick={toggleCollapse}
                            color="dark"
                            size="md"
                            icon={<i className="fas fa-search" />}
                            name={isOpen ? "Close" : "Search"}
                        />
                </Col>
                <Col
                    className="jumbotron jumbotron-fluid right"
                    md="6"
                >
                    <Users
                        messages={messages}
                    />
                    <Review />
                    <Reviews
                        messages={messages}
                        getMessages={getMessages}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default UserReviews;
