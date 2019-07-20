import React, { useEffect, useContext, useState } from 'react';
import UserContext from './userContext';
import SocketContext from './socketContext';
import API from '../utils/API';
import Avatar from 'avataaars';
import { Col } from 'reactstrap';

const Users = props => {

    const { user } = useContext(UserContext);

    const [users, setUsers] = useState([]);

        props.socket.on('RECEIVE_USER', data => {
            if (data) {

                loadUsers();
            }
        });

        const loadUsers = () => {
            API.getUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
        };

        useEffect(() => {
            props.socket.emit('SEND_USER', {
                user
            });
        }, [props.socket, user])

        return (
            <div>
                <h2>Online Users</h2>
                <Col sm="12" md={{ size: 6 }}>
                    {users && users.map(online => {
                        return (
                            <div key={online._id}>
                                <strong><Avatar
                                    style={{ width: '30px', height: '30px' }}
                                    avatarStyle={online.avatarStyle}
                                    topType={online.topType}
                                    accessoriesType={online.accessoriesType}
                                    hairColor={online.hairColor}
                                    facialHairType={online.facialHairType}
                                    facialHairColor={online.facialHairColor}
                                    clotheType={online.clotheType}
                                    clotheColor={online.clotheColor}
                                    graphicType={online.graphicType}
                                    eyeType={online.eyeType}
                                    eyebrowType={online.eyebrowType}
                                    mouthType={online.mouthType}
                                    skinColor={online.skinColor}
                                />{online.username}</strong>
                            </div>
                        );
                    })}
                </Col>
            </div>
    );
}

const UsersWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Users {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default UsersWithSocket;