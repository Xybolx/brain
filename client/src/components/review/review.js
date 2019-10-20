import React, { useContext } from 'react';
import API from '../../utils/API';
import UserContext from '../../context/userContext';
import SocketContext from '../../context/socketContext';
import RoomContext from '../../context/roomContext';
import Sentiment from 'sentiment';
import useForm from '../form/useForm';
import InputFormGroup from '../form/inputFormGroup';
import SubTitle from '../headers/subTitle';
import PageLogo from '../logo/pageLogo';

const Review = ({ socket }) => {

    // Context
    const { user } = useContext(UserContext);
    const { room } = useContext(RoomContext);

    // State
    const [values, handleChange, handleClearInputs] = useForm();

    // De-structure values
    const { review } = values;

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
                .then(res => {
                    socket.emit('SEND_MESSAGE', {
                        author: user.username,
                        avatar: user.avatar,
                        message: review,
                        movie: room,
                        result: result.score
                    })
                })
                .then(() => handleClearInputs())
                .catch(err => console.log(err))
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
                    <InputFormGroup
                        handleFormSubmit={handleFormSubmit}
                        inputType="textarea"
                        placeholder="Write a review..."
                        value={review || ""}
                        name="review"
                        handleChange={handleChange}
                        btnIcon={<i className="fas fa-paper-plane" />}
                    />
                </>
            ) : (

                    <div style={{ marginTop: 60 }}>
                        <PageLogo
                            stackSize="8"
                        />
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