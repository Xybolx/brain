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
        <div style={room ? { display: 'block' } : { display: 'none' }}>
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
                                            topType={roomMessage.avatar.topType}
                                            accessoriesType={roomMessage.avatar.accessoriesType}
                                            hairColor={roomMessage.avatar.hairColor}
                                            facialHairType={roomMessage.avatar.facialHairType}
                                            facialHairColor={roomMessage.avatar.facialHairColor}
                                            clotheType={roomMessage.avatar.clotheType}
                                            clotheColor={roomMessage.avatar.clotheColor}
                                            graphicType={roomMessage.avatar.graphicType}
                                            eyeType={roomMessage.avatar.eyeType}
                                            eyebrowType={roomMessage.avatar.eyebrowType}
                                            mouthType={roomMessage.avatar.mouthType}
                                            skinColor={roomMessage.avatar.skinColor}
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
        </div>
    );
}

const MessagesWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Messages {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MessagesWithSocket;