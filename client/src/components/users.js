import React, { useEffect, useContext } from 'react';
import { Container, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import UserContext from '../context/userContext';
import UsersContext from '../context/usersContext';
import SocketContext from '../context/socketContext';
import API from '../utils/API';
import Avatar from 'avataaars';
import UserStats from './userStats';
import Spinner from './spinner';

const Users = ({ socket }) => {

    // Context
    const { user } = useContext(UserContext);
    const { users, setUsers } = useContext(UsersContext);

    useEffect(() => {
        socket.emit('SEND_USER', {
            user
        });
    }, [user, socket])

    // Subscribe/un-subscribe to socket
    useEffect(() => {
        socket.on('RECEIVE_USER', data => {
            if (data) {
                console.log(data);
                API.getUsers()
                    .then(res => setUsers(res.data))
                    .catch(err => console.log(err))
            }
        });
        return () => {
            socket.off('RECEIVE_USER');
        };
    }, [setUsers, socket])


    return (
        <div style={{ marginBottom: 30 }}>
            <h4>{users.length ? users.length : ""} <i className="fas fa-users" /> Users</h4>
            {users.length ? (
                <ListGroup className="users">
                    {users.map(online => (
                        <ListGroupItem key={online._id}>
                            <ListGroupItemText className="userStrong">
                                <Avatar
                                    style={{ width: '30px', height: '30px' }}
                                    avatarStyle={online.avatar.avatarStyle}
                                    topType={online.avatar.topType}
                                    accessoriesType={online.avatar.accessoriesType}
                                    hairColor={online.avatar.hairColor}
                                    facialHairType={online.avatar.facialHairType}
                                    facialHairColor={online.avatar.facialHairColor}
                                    clotheType={online.avatar.clotheType}
                                    clotheColor={online.avatar.clotheColor}
                                    graphicType={online.avatar.graphicType}
                                    eyeType={online.avatar.eyeType}
                                    eyebrowType={online.avatar.eyebrowType}
                                    mouthType={online.avatar.mouthType}
                                    skinColor={online.avatar.skinColor}
                                    online={online}
                                />
                                {online.username}&nbsp;
                                <UserStats online={online} />
                            </ListGroupItemText>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            ) : (
                    <Spinner
                        altMsg="Loading..."
                    />
                )}
        </div>
    );
}

const UsersWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Users {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default UsersWithSocket;