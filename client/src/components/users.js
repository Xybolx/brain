import React, { useEffect, useContext } from 'react';
import { Container } from 'reactstrap';
import UserContext from '../context/userContext';
import UsersContext from '../context/usersContext';
import SocketContext from '../context/socketContext';
import API from '../utils/API';
import Avatar from 'avataaars';
import UserStats from './userStats';
import Spinner from './spinner';

const Users = props => {

    // Context
    const { user } = useContext(UserContext);
    const { users, setUsers } = useContext(UsersContext);

    useEffect(() => {
        props.socket.emit('SEND_USER', {
            user
        });
    }, [user, props.socket])

    // Subscribe/un-subscribe to socket
    useEffect(() => {
        props.socket.on('RECEIVE_USER', data => {
            if (data) {
                console.log(data);
                API.getUsers()
                    .then(res => setUsers(res.data))
                    .catch(err => console.log(err))
            }
        });
        return () => {
            props.socket.off('RECEIVE_USER');
        };
    }, [setUsers, props.socket])


    return (
        <div style={{ marginBottom: 30 }}>
            <h4>{users.length ? users.length : ""} <i className="fas fa-users" /> Users</h4>
            {users.length ? (
                <Container className="users">
                    {users.map(online => (
                        <div key={online._id}>
                            <strong className="userStrong">
                                <Avatar
                                    style={{ width: '30px', height: '30px' }}
                                    avatarStyle={online.avatar[0].avatarStyle}
                                    topType={online.avatar[0].topType}
                                    accessoriesType={online.avatar[0].accessoriesType}
                                    hairColor={online.avatar[0].hairColor}
                                    facialHairType={online.avatar[0].facialHairType}
                                    facialHairColor={online.avatar[0].facialHairColor}
                                    clotheType={online.avatar[0].clotheType}
                                    clotheColor={online.avatar[0].clotheColor}
                                    graphicType={online.avatar[0].graphicType}
                                    eyeType={online.avatar[0].eyeType}
                                    eyebrowType={online.avatar[0].eyebrowType}
                                    mouthType={online.avatar[0].mouthType}
                                    skinColor={online.avatar[0].skinColor}
                                    online={online}
                                />
                                {online.username}&nbsp;
                                <UserStats online={online} />
                            </strong>
                        </div>
                    ))}
                </Container>
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