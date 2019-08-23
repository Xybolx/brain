import React, { useContext, useState } from 'react';
import API from '../utils/API';
import UserContext from '../context/userContext';
import UsersContext from '../context/usersContext';
import SocketContext from '../context/socketContext';
import RoomContext from '../context/roomContext';
import Sentiment from 'sentiment';
import ReviewForm from './reviewForm';
import SubTitle from './subTitle';
import PageLogo from './pageLogo';

const Review = ({ socket }) => {

    // Context
    const { user, setUser } = useContext(UserContext);
    const { setUsers } = useContext(UsersContext);
    const { room } = useContext(RoomContext);

    // State
    const [review, setReview] = useState('');

    // Get and set current user state
    const getUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    const getUsers = () => {
        API.getUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    };

    // Handle input change
    const handleChange = ev => {
        setReview(ev.target.value)
    }

    // Handle submit
    const handleFormSubmit = ev => {
        const sentiment = new Sentiment();
        const result = sentiment.analyze(review);
        ev.preventDefault();
        if (review) {
            API.saveMessage({
                author: user.username,
                avatar: user.avatar,
                message: review,
                movie: room,
                result: result.score
            })
                .then(res => getUser())
                .then(() => getUsers())
                .then(() => {
                    socket.emit('SEND_MESSAGE', {
                        author: user.username,
                        avatar: user.avatar,
                        message: review,
                        movie: room,
                        result: result.score
                    })
                })
                .catch(err => console.log(err))
            setReview('');
        }
    };

    return (
        <>
            {room ? (
                <>
                    <SubTitle
                        style={{ marginTop: 30 }}
                        icon={<i className="fas fa-theater-masks" />}
                        header={`${room}`}
                    />
                    <ReviewForm
                        handleFormSubmit={handleFormSubmit}
                        inputType="textarea"
                        placeholder="Write a review..."
                        value={review}
                        name="review"
                        handleChange={handleChange}
                    />
                </>
            ) : (

                    <div style={{ marginTop: 60 }}>
                        <PageLogo />
                    </div>

                )}
        </>
    );
}

const ReviewWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Review {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ReviewWithSocket;