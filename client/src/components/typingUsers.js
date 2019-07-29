import React, { Component } from 'react';
import UserContext from './userContext';
import { socket } from './chat';
import Avatar from 'avataaars';
import { Col } from 'reactstrap';

class TypingUsers extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            isTyping: [],
            userTyping: ''
        }

        socket.on('RECEIVE_TYPING_USER', data => {
            const { isTyping, userTyping } = this.state;
            const username = data.typingUser;
            if (data && userTyping !== username) {
                console.log(data);
                this.setState({
                    isTyping: [...isTyping, data],
                    userTyping: username
                });
            }
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(this.typeTimeout, 4000);
        });
    }

    typeTimeout = () => {
        this.setState({
            isTyping: [],
            userTyping: ''
        })
    } 

    componentDidMount() {
        console.log('typingUsers mounted');
    }

    componentWillUnmount() {
        console.log('typingUsers un-mounted');
        socket.off('RECEIVE_TYPING_USER');
        clearTimeout(this.typingTimeout);
    }

    render() {
        return (
            <div>
                <h4>Typing Users</h4>
                <Col sm="12" md={{ size: 6 }}>
                    {this.state.isTyping.map(typing => {
                        return (
                            <div key={typing.typingUser}>
                                <strong>
                                    <Avatar
                                        style={{ width: '30px', height: '30px' }}
                                        avatarStyle={typing.typingAvatar.avatarStyle}
                                        topType={typing.typingAvatar.topType}
                                        accessoriesType={typing.typingAvatar.accessoriesType}
                                        hairColor={typing.typingAvatar.hairColor}
                                        facialHairType={typing.typingAvatar.facialHairType}
                                        facialHairColor={typing.typingAvatar.facialHairColor}
                                        clotheType={typing.typingAvatar.clotheType}
                                        clotheColor={typing.typingAvatar.clotheColor}
                                        graphicType={typing.typingAvatar.graphicType}
                                        eyeType={typing.typingAvatar.eyeType}
                                        eyebrowType={typing.typingAvatar.eyebrowType}
                                        mouthType={typing.typingAvatar.mouthType}
                                        skinColor={typing.typingAvatar.skinColor}
                                    />
                                    {typing.typingUser}
                                </strong>
                            </div>
                        );
                    })}
                </Col>
            </div>
        );
    }
}

export default TypingUsers;