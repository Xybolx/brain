import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const Home = () => {

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1>Brain</h1>
            <h2><Link to="/signup">Sign Up</Link></h2>
            <h2><Link to="/login">Log In</Link></h2>
        </Col>
    );
}

export default Home;