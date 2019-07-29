import React, { useContext } from 'react';
import API from '../utils/API';
import UserContext from './userContext';
import SocketContext from './socketContext';
import { useForm } from './useForm';
import Sentiment from 'sentiment';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Messages = props => {

    // Context
    const { user, setUser } = useContext(UserContext);

    // useForm
    const [values, handleChange] = useForm({
        message: ''
    });

    const loadUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    // Handle submit
    const handleFormSubmit = ev => {
        const message = values.message;
        const sentiment = new Sentiment();
        const result = sentiment.analyze(message);
        ev.preventDefault();
        if (message) {
            API.saveMessage({
                author: user.username,
                avatar: user.avatar[0],
                message: message,
                result: result.score
            })
                .then(res => loadUser())
                .then(() => {
                    props.socket.emit('SEND_MESSAGE', {
                        author: user.username,
                        avatar: user.avatar[0],
                        message: message,
                        result: result.score
                    })
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <div>
            <h4>Send Message</h4>
            <Col sm="12">
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label htmlFor="messageInput">Message</Label>
                        <Input
                            type="textarea"
                            name="message"
                            placeholder="Enter Message"
                            value={values.message}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        color="info"
                        size="md"
                        outline
                        block>
                        Post
                    </Button>
                </Form>
            </Col>
        </div>
    );
}

const MessageWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Messages socket={socket} />}
    </SocketContext.Consumer>
);

export default MessageWithSocket;