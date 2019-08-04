import React, { useEffect, useState, useContext } from 'react';
import UserContext from './context/userContext';
import SocketContext from './context/socketContext';
import API from '../utils/API';
import Avatar from 'avataaars';
import Detail from './detail';

const Users = props => {

    // Context
    const { user } = useContext(UserContext);

    // Initial State
    const [users, setUsers] = useState([]);

    useEffect(() => {
        props.socket.emit('SEND_USER', {
            user: user.username
        });
        props.socket.on('RECEIVE_USER', data => {
            if (data) {
                console.log(data);
            }
        });
        return () => {
            props.socket.off('RECEIVE_USER');
        };
    }, [user, props.socket])

    // API Calls
    useEffect(() => {
        console.log('getUsers effect fired')
        API.getUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [user])

    return (
        <div>
            <h4 style={{ marginTop: 30 }}>Online Users</h4>
            {users.length ? (
                <div>
                    {users.map(online => (
                        <div key={online._id}>
                            <strong>
                                <Avatar
                                    style={{ width: '40px', height: '40px' }}
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
                                <Detail online={online} />
                            </strong>
                        </div>
                    ))}
                </div>
            ) : (
                    <h3><i className="fas fa-spinner fa-spin" />Loading...</h3>
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