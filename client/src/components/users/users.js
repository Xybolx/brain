import React, { useEffect, useContext } from 'react';
import { Table } from 'reactstrap';
import UserContext from '../../context/userContext';
import UsersContext from '../../context/usersContext';
import SocketContext from '../../context/socketContext';
import API from '../../utils/API';
import Avatar from 'avataaars';
import UserStats from './userStats';
import { Spinner } from '../spinner';
import SubTitle from '../headers/subTitle';

const Users = ({ socket, messages }) => {

    // Context
    const { user } = useContext(UserContext);
    const { users, setUsers } = useContext(UsersContext);

    // get and set state
    const getUsers = () => {
        API.getUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        socket.emit('SEND_USER', {
            user
        });
    }, [user, socket])

    // Subscribe/un-subscribe to socket
    useEffect(() => {
        socket.on('RECEIVE_USER', data => {
            if (data) {
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
        <>
            <SubTitle
                number={users.length ? users.length : ""}
                icon={<i className="fas fa-users" />}
                header="Reviewer(s)"
            />
            <div className="usersDiv">
                {users.length ? (
                    <Table size="sm" responsive>
                        <tbody className="users">
                            {users.map(online => (
                                <tr key={online._id}>
                                    <td className="userStrong">
                                        <Avatar
                                            style={{ width: '30px', height: '30px' }}
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
                                        />
                                    </td>
                                    <td>
                                        {online.username}
                                    </td>
                                    <td>
                                        <UserStats
                                            online={online}
                                            getUsers={getUsers}
                                            messages={messages}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                        <Spinner
                            altMsg="Loading..."
                        />
                    )}
            </div>
        </>
    );
}

const UsersWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Users {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default UsersWithSocket;