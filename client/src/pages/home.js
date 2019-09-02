import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import PageLogo from '../components/pageLogo';

const Home = () => {

    return (
        <div className="page-container" style={{ marginTop: 30 }}>
            <PageLogo stackSize="8" />
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <p
                    className="homeText"
                >
                    Welcome to FilmBrains. Finally, a movie ratings site with integrity. Log in <Link className="homeLink" to="/login">here</Link> or <Link className="homeLink" to="/signup">sign up</Link> to access and write movie reviews, view user and movie stats, and add new movies to review. To write or see reviews for a movie click it's "Review" button. If you don't see the title you want, search for it, hit the "Save" button, and then click the "Review" button. You can see a user's stats by clicking their "Stats" link. To see a movie's stats click it's "Stats" button. You can also see a movie's trailer and view it on Amazon in the "Details" category. Movie info coutresy of OMDB.
                </p>
            </Col>
        </div>
    );
}

export default Home;