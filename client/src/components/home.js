import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const Home = () => {

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <p>Welcome to FilmBrain.com. Finally, a movie ratings site with integrity. <Link to="/signup">Sign up</Link> or <Link to="/login">log in</Link> to access movie and T.V. show ratings and reviews that haven't been corrupted by "spammers". If you see the movie or T.V. show title you'd like to rate just click "Rate This Title". If you don't, search for it, hit the save movie button, and then click "Rate This Title". You can see a user's or movie/T.V. title's stats by clicking their "Stats" link. </p>
            <h2><Link to="/signup"><i className="fas fa-user-plus" /> Sign Up</Link></h2>
            <h2><Link to="/login"><i className="fas fa-sign-in-alt" /> Log In</Link></h2>
        </Col>
    );
}

export default Home;