import React, { useState, useEffect, useContext } from 'react';
import API from '../utils/API';
import SocketContext from '../context/socketContext';
import RoomContext from '../context/roomContext';
import moment from 'moment';
import Avatar from 'avataaars';
import Spinner from './spinner';
import { Badge, Container, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const Messages = ({ socket }) => {

    // Context
    const { room } = useContext(RoomContext);
    // State
    const [messages, setMessages] = useState([]);
    const [roomMessages, setRoomMessages] = useState([]);

    // Get messages function
    const getMessages = () => {
        API.getMessages()
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    };

    // Get and set state
    useEffect(() => {
        getMessages();
    }, [])

    useEffect(() => {
        const getRoomMessages = () => {
            const roomMsgs = messages.filter(message => message.movie === room);
            setRoomMessages(roomMsgs);
        };
        getRoomMessages();
    }, [room, messages])

    // Subscribe and un-subscribe to socket
    useEffect(() => {
        socket.on('RECEIVE_MESSAGE', data => {
            if (data) {
                console.log(data);
                getMessages();
            }
        });
        return () => {
            socket.off('RECEIVE_MESSAGE');
        };
    }, [socket])

    // Msg div style
    const msgDivStyle = {
        marginTop: "20px",
        height: "300px",
        overflow: "scroll",
        overflowX: "hidden"
    }

    return (
        <Container style={room ? { display: 'block' } : { display: 'none' }}>
            <h4>{room} Reviews</h4>
            {roomMessages.length ? (
                <div
                    style={msgDivStyle}
                    className="messages">
                    {roomMessages.map(roomMessage => (
                        <Card key={roomMessage._id}>
                            <CardBody>
                                <CardTitle>
                                    <strong>
                                        <Avatar
                                            style={{ width: '30px', height: '30px' }}
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
                                                color={roomMessage.result === 0 ? "warning" : roomMessage.result < 0 ? "danger" : roomMessage.result > 0 ? "success" : "dark"} pill
                                                >
                                                    {roomMessage.result === 0 ? "Neutral" : roomMessage.result < 0 ? "Negative" : roomMessage.result > 0 ? "Positive" : ""}
                                            </Badge>
                                        </span>
                                    </strong>
                                </CardTitle>
                                <CardText>
                                    "{roomMessage.message}"
                                    </CardText>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                    <Spinner
                        altMsg="No Results..."
                    />
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