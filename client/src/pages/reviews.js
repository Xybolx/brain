import React, { useEffect, lazy, Suspense } from 'react';
import Reviews from '../components/review/reviews';
import Review from '../components/review/review';
import MovieSearch from '../components/movie/movieSearch';
import { Spinner } from '../components/spinner';
import useSpeech from '../components/hooks/useSpeech';
import useBoolean from '../components/hooks/useBoolean';
import useAPI from '../components/hooks/useAPI';
import Btn from '../components/button/btn';
import { Row, Col, Collapse } from 'reactstrap';

const Movies = lazy(() =>
    import('../components/movie/movies'));

const Users = lazy(() =>
    import('../components/users/users'));

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
                    <Suspense fallback={<Spinner altMsg="Getting Movies..." />}>
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
                    </Suspense>
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
                    <Suspense fallback={<Spinner altMsg="Getting Users..." />}>
                        <Users
                            messages={messages}
                        />
                    </Suspense>
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
