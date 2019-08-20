import React, { useState } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);

    // toggle collapse function
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Title
                header="Reviews"
            />
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
                        <Movies isOpen={isOpen} />
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
                    <Reviews />
                </Col>
            </Row>
        </div>
    );
}

export default UserReviews;
