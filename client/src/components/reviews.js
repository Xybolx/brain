import React, { useState, useEffect, useContext } from 'react';
import { Badge, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import SocketContext from '../context/socketContext';
import RoomContext from '../context/roomContext';
import moment from 'moment';
import Avatar from 'avataaars';
import { Spinner } from '../components/spinner';
import SubTitle from './headers/subTitle';

const Reviews = ({ socket, messages, getMessages }) => {

    // Context
    const { room } = useContext(RoomContext);

    // State
    const [roomMessages, setRoomMessages] = useState([]);

    // Get and set state
    useEffect(() => {
        const getRoomMessages = () => {
            const roomMsgs = messages.filter(message => message.movie === room);
            setRoomMessages(roomMsgs);
        };
        getRoomMessages();
    }, [messages, room])

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
    }, [socket, getMessages])

    return (
        <div style={room ? { display: 'block' } : { display: 'none' }}>
            <SubTitle
                style={roomMessages.length ? { display: "block" } : { display: "none" }}
                className="reviewTitle"
                number={roomMessages.length ? `${roomMessages.length}` : ``}
                icon={<i className="fas fa-theater-masks" />}
                header="Review(s)"
            />
            {roomMessages.length ? (
                <div className="messages">
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
                                                color={
                                                    roomMessage.result === 0
                                                        ? "warning"
                                                        : roomMessage.result < 0
                                                            ? "danger"
                                                            : roomMessage.result > 0
                                                                ? "success"
                                                                : "dark"
                                                }
                                            >
                                                {roomMessage.result === 0
                                                    ? "Neutral"
                                                    : roomMessage.result < 0
                                                        ? "Negative"
                                                        : roomMessage.result > 0
                                                            ? "Positive"
                                                            : ""
                                                }
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
                        altMsg="No Reviews..."
                    />
                )}
        </div>
    );
}

const ReviewsWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Reviews {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ReviewsWithSocket;