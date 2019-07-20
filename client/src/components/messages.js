import React, { Component } from 'react';
import API from '../utils/API';
import UserContext from './userContext';
import SocketContext from './socketContext';
import Avatar from 'avataaars';
import {
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Toast,
    ToastHeader,
    ToastBody
}
    from 'reactstrap';

class Messages extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: []
        }

        this.props.socket.on('RECEIVE_MESSAGE', data => {
            if (data) {
                this.loadMessages();
            }
        });
    };

    handleInputChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = ev => {
        ev.preventDefault();
        this.props.socket.emit('SEND_MESSAGE', {
            author: this.context.user,
            message: this.state.message,
        });

        API.saveMessage({
            author: this.context.user,
            message: this.state.message
        });

        this.setState({ message: '' });
    };

    loadMessages = () => {
        API.getMessages()
        .then(res => this.setState({ messages: res.data }))
    };

    componentDidMount() {
        this.loadMessages();
    }

    render() {
        return (
            <div>
                <h4>Messages</h4>
                <Col sm="12" md={{ size: 6, offset: 3 }} className="messages">
                    {this.state.messages.map(message => {
                        return (
                            <Toast key={message.id}>
                                <ToastHeader
                                    icon={<Avatar
                                        style={{ width: '30px', height: '30px' }}
                                        avatarStyle={message.author[0].avatarStyle}
                                        topType={message.author[0].topType}
                                        accessoriesType={message.author[0].accessoriesType}
                                        hairColor={message.author[0].hairColor}
                                        facialHairType={message.author[0].facialHairType}
                                        facialHairColor={message.author[0].facialHairColor}
                                        clotheType={message.author[0].clotheType}
                                        clotheColor={message.author[0].clotheColor}
                                        graphicType={message.author[0].graphicType}
                                        eyeType={message.author[0].eyeType}
                                        eyebrowType={message.author[0].eyebrowType}
                                        mouthType={message.author[0].mouthType}
                                        skinColor={message.author[0].skinColor}
                                    />}>
                                    <h6>{message.author[0].username}</h6>
                                </ToastHeader>
                                <ToastBody>
                                    <div>
                                        "{message.message}"
                                        </div>
                                </ToastBody>
                            </Toast>
                        );
                    })}
                </Col>
                <br />
                <h4>Send Message</h4>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={this.handleFormSubmit}>
                        <FormGroup>
                            <Label htmlFor="messageInput">Message</Label>
                            <Input
                                type="textarea"
                                name="message"
                                placeholder="Enter Message"
                                value={this.state.message}
                                onChange={this.handleInputChange}
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
}

const MessagesWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Messages {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MessagesWithSocket;