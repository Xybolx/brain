import React, { useContext, useState } from 'react';
import API from '../utils/API';
import UserContext from '../context/userContext';
import UsersContext from '../context/usersContext';
import SocketContext from '../context/socketContext';
import RoomContext from '../context/roomContext';
import Sentiment from 'sentiment';
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const Message = ({ socket }) => {

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
        <div style={room ? { display: 'block', marginBottom: 30, marginTop: 30 } : { display: 'none' }}>
            <h4 style={{ marginTop: 30 }}>Review {room}</h4>
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <Input
                                type="textarea"
                                name="review"
                                placeholder="Write a review..."
                                value={review}
                                onChange={handleChange}
                            />
                            <InputGroupAddon addonType="append"><Button type="submit" color="dark" size="md"><span className="fas fa-paper-plane"></span></Button></InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Form>
        </div>
    );
}

const MessageWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Message {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MessageWithSocket;