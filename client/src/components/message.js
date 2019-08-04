import React, { useContext, useState } from 'react';
import API from '../utils/API';
import UserContext from './context/userContext';
import SocketContext from './context/socketContext';
import RoomContext from './context/roomContext';
import Sentiment from 'sentiment';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Message = props => {

    // Context
    const { user, setUser } = useContext(UserContext);
    const { room } = useContext(RoomContext);

    // State
    const [review, setReview] = useState('');

    // Get and set current user state
    const loadUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
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
                avatar: user.avatar[0],
                message: review,
                movie: room,
                result: result.score
            })
                .then(res => loadUser())
                .then(() => {
                    props.socket.emit('SEND_MESSAGE', {
                        author: user.username,
                        avatar: user.avatar[0],
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
        <div style={room ? { display: 'block' } : { display: 'none' }}>
            <h5 style={{ marginTop: 30 }}>Write a Review for {room}</h5>
            <Col sm="12">
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label style={{ marginLeft: 5 }} htmlFor="review">Review</Label>
                        <Input
                            type="textarea"
                            name="review"
                            placeholder={"Write a review for " + room}
                            value={review}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        color="info"
                        size="md"
                        block>
                        <span className="fas fa-paper-plane"></span>
                    </Button>
                </Form>
            </Col>
        </div>
    );
}

const MessageWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Message {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MessageWithSocket;