import React, { useState, useEffect, useContext } from 'react';
import API from '../utils/API';
import SocketContext from './socketContext';
import UserContext from './userContext';
import moment from 'moment';
import Avatar from 'avataaars';
import { Badge, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const Messages = props => {

    // Context 
    const { user, setUser } = useContext(UserContext);

    // State
    const [messages, setMessages] = useState([]);

    // Get and set state
    useEffect(() => {
        API.getMessages()
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [])

    // Subscribe and un-subscribe to socket
    useEffect(() => {
        props.socket.on('RECEIVE_MESSAGE', data => {
            if (data) {
                API.getMessages()
                    .then(res => setMessages(res.data))
                    .catch(err => console.log(err))
            }
        });
        return () => {
            props.socket.off('RECEIVE_MESSAGE');
        };
    }, [props.socket])

    // Msg div style
    const msgDivStyle = {
        marginTop: "20px",
        height: "250px",
        overflow: "scroll",
        overflowX: "hidden"
    }

    return (
        <div>
            <h4>Messages</h4>
            <Col
                sm="12"
                style={msgDivStyle}
                className="messages">
                {messages.map(message => {
                    return (
                        <Card key={message._id}>
                            <CardBody>
                                <CardTitle>
                                    <Avatar
                                        style={{ width: '30px', height: '30px' }}
                                        avatarStyle={message.avatar[0].avatarStyle}
                                        topType={message.avatar[0].topType}
                                        accessoriesType={message.avatar[0].accessoriesType}
                                        hairColor={message.avatar[0].hairColor}
                                        facialHairType={message.avatar[0].facialHairType}
                                        facialHairColor={message.avatar[0].facialHairColor}
                                        clotheType={message.avatar[0].clotheType}
                                        clotheColor={message.avatar[0].clotheColor}
                                        graphicType={message.avatar[0].graphicType}
                                        eyeType={message.avatar[0].eyeType}
                                        eyebrowType={message.avatar[0].eyebrowType}
                                        mouthType={message.avatar[0].mouthType}
                                        skinColor={message.avatar[0].skinColor}
                                    />
                                    {message.author}
                                    <span className="infoSpan">
                                        <span
                                            className="dateSpan">
                                            {moment(message.date).fromNow()}
                                        </span>
                                        <Badge
                                            style={message.result > 0
                                                ? { display: 'inline' }
                                                : { display: 'none' }}
                                            color="success" pill>
                                            Positive
                                            </Badge>
                                        <Badge
                                            style={message.result === 0
                                                ? { display: 'inline' }
                                                : { display: 'none' }}
                                            color="warning" pill>
                                            Nuetral
                                            </Badge>
                                        <Badge
                                            style={message.result < 0
                                                ? { display: 'inline' }
                                                : { display: 'none' }}
                                            color="danger" pill>
                                            Negative
                                            </Badge>
                                    </span>
                                </CardTitle>
                                <CardText>
                                    "{message.message}"
                                    </CardText>
                            </CardBody>
                        </Card>
                    );
                })}
            </Col>
        </div>
    );
}

const MessagesWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Messages socket={socket} />}
    </SocketContext.Consumer>
);

export default MessagesWithSocket;