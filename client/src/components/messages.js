import React, { useState, useEffect, useContext } from 'react';
import API from '../utils/API';
import SocketContext from './context/socketContext';
import RoomContext from './context/roomContext';
import moment from 'moment';
import Avatar from 'avataaars';
import { Badge, Container, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const Messages = props => {

    // Context
    const { room } = useContext(RoomContext);
    // State
    const [messages, setMessages] = useState([]);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        API.getMessages()
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const getMessages = () => {
            const roomMsgs = messages.filter(message => message.movie === room);
            setRoomMessages(roomMsgs);
        };
        getMessages();
    }, [room, messages])

    // Subscribe and un-subscribe to socket
    useEffect(() => {
        props.socket.on('RECEIVE_MESSAGE', data => {
            if (data) {
                console.log(data);
                API.getMessages()
                    .then(res => setMessages(res.data))
                    .catch(err => console.log(err))
            }
        });
        return () => {
            console.log('receive msg: socket off')
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
        <Container style={ room ? { display: 'block' } : { display: 'none' }}>
            <h6 style={{ marginTop: 30 }}>{room} Reviews</h6>
            {roomMessages.length ? (
                <Col
                sm="12"
                style={msgDivStyle}
                className="messages">
                    {roomMessages.map(roomMessage => (
                        <Card key={roomMessage._id}>
                            <CardBody>
                                <CardTitle>
                                    <Avatar
                                        style={{ width: '30px', height: '30px' }}
                                        avatarStyle={roomMessage.avatar[0].avatarStyle}
                                        topType={roomMessage.avatar[0].topType}
                                        accessoriesType={roomMessage.avatar[0].accessoriesType}
                                        hairColor={roomMessage.avatar[0].hairColor}
                                        facialHairType={roomMessage.avatar[0].facialHairType}
                                        facialHairColor={roomMessage.avatar[0].facialHairColor}
                                        clotheType={roomMessage.avatar[0].clotheType}
                                        clotheColor={roomMessage.avatar[0].clotheColor}
                                        graphicType={roomMessage.avatar[0].graphicType}
                                        eyeType={roomMessage.avatar[0].eyeType}
                                        eyebrowType={roomMessage.avatar[0].eyebrowType}
                                        mouthType={roomMessage.avatar[0].mouthType}
                                        skinColor={roomMessage.avatar[0].skinColor}
                                    />
                                    {roomMessage.author}
                                    <span className="infoSpan">
                                        <span
                                            className="dateSpan">
                                            {moment(roomMessage.date).fromNow()}
                                        </span>
                                        <Badge
                                            style={roomMessage.result > 0
                                                ? { display: 'inline' }
                                                : { display: 'none' }}
                                            color="success" pill>
                                            Positive
                                            </Badge>
                                        <Badge
                                            style={roomMessage.result === 0
                                                ? { display: 'inline' }
                                                : { display: 'none' }}
                                            color="warning" pill>
                                            Neutral
                                            </Badge>
                                        <Badge
                                            style={roomMessage.result < 0
                                                ? { display: 'inline' }
                                                : { display: 'none' }}
                                            color="danger" pill>
                                            Negative
                                            </Badge>
                                    </span>
                                </CardTitle>
                                <CardText>
                                    "{roomMessage.message}"
                                    </CardText>
                            </CardBody>
                        </Card>
                    ))}
                </Col>
            ) : (
                    <h3><i className="fas fa-spinner fa-spin" />Loading...</h3>
                )}
        </Container>
    );
}

const MessagesWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Messages {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MessagesWithSocket;