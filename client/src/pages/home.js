import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import Title from '../components/title';

const Home = () => {

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Title
                header="HOME"
            />
            <p
                className="homeText"
            >
                Welcome to FilmBrains. Finally, a movie ratings site with integrity. Log in <Link className="homeLink" to="/login"><i className="fas fa-sign-in-alt fa-fw" /> here</Link> or <Link className="homeLink" to="/signup"><i className="fas fa-user-plus fa-fw" /> sign up</Link> to access and write movie reviews, view user and movie stats, and add new movies to review. To write or see reviews for a movie click it's "Review" button. If you don't see the title you want, search for it, hit the "Save" button, and then click the "Review" button. You can see a user's stats by clicking their "Stats" link. To see a movie's stats click it's "Stats" button. You can also see a movie's trailer and view it on Amazon in the "Details" category. Movie info coutresy of OMDB.
                </p>
        </Col>
    );
}

export default Home;