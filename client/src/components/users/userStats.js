import React, { useState, useContext, useEffect } from 'react';
import { Badge, Progress, Modal, ModalBody } from 'reactstrap';
import Avatar from 'avataaars';
import UserContext from '../../context/userContext';
import useStats from "../hooks/useStats";
import StatTitle from '../headers/statTitle';
import Btn from '../button/btn';

const UserStats = ({ online, getUsers, messages }) => {

    // Context
    const { user } = useContext(UserContext);

    // State
    const [statMessages, setStatMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [
        scoreTotal,
        neutralTotal,
        positiveTotal,
        negativeTotal,
        neutralAvg,
        positiveAvg,
        negativeAvg
    ] = useStats(statMessages);

    // Toggle user stats
    const toggle = () => {
        setIsOpen(!isOpen);
        getUsers();
    };

    useEffect(() => {
        const msgFilter = messages.filter(message => message.author === online.username);
        setStatMessages(msgFilter)
    }, [messages, online.username])

    return (
        <>
            <Btn
                onClick={toggle}
                style={
                    !user.userMessages.length
                        ? { display: 'none' }
                        : { display: 'inline' }}
                color="link"
                size="sm"
                icon={<i className="fas fa-poll-h" />}
                name="Stats"
            />
            <Modal
                className="userStatDiv"
                isOpen={isOpen}
                centered
            >
                <ModalBody>
                    <div className="statsTitle">
                        <StatTitle
                            icon={<Avatar
                                style={{ width: '20px', height: '25px' }}
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
                            />}
                            header={online.username}
                        />
                        <StatTitle
                            icon={<i className="fas fa-balance-scale" />}
                            header="FilmBrains Bias:"
                            badge={
                                <Badge
                                    color={
                                        scoreTotal < 0
                                            ? "danger"
                                            : scoreTotal > 0
                                                ? "success"
                                                : "warning"
                                    }
                                    pill
                                >
                                    {scoreTotal > 0
                                        ? `+ ${scoreTotal}`
                                        : scoreTotal < 0
                                            ? `${scoreTotal}`
                                            : "Even"}
                                </Badge>
                            }
                        />
                        <StatTitle
                            header="Averages"
                            icon={<i className="fas fa-poll-h" />}
                        />
                        <Progress
                            color="success"
                            value={positiveAvg}
                            max={100}
                        >
                            {isNaN(positiveAvg)
                                ? `No Data`
                                : `Positive ${positiveAvg}%`}
                        </Progress>
                        <Progress
                            color="warning"
                            value={neutralAvg}
                            max={100}
                        >
                            {isNaN(neutralAvg)
                                ? `No Data`
                                : `Neutral ${neutralAvg}%`}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeAvg}
                            max={100}
                        >
                            {isNaN(negativeAvg)
                                ? `No Data`
                                : `Negative ${negativeAvg}%`}
                        </Progress>
                        <StatTitle
                            header="Totals"
                            icon={<i className="fas fa-poll-h" />}
                        />
                        <Progress
                            color="success"
                            value={positiveTotal}
                            max={statMessages.length}
                        >
                            Positive {positiveTotal}/{statMessages.length}
                        </Progress>
                        <Progress
                            color="warning"
                            value={neutralTotal}
                            max={statMessages.length}
                        >
                            Neutral {neutralTotal}/{statMessages.length}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeTotal}
                            max={statMessages.length}
                        >
                            Negative {negativeTotal}/{statMessages.length}
                        </Progress>
                        <div className="closeDiv">
                            <Btn
                                color="dark"
                                size="md"
                                onClick={toggle}
                                icon={<i className="fas fa-window-close" />}
                                name="Close"
                            />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default UserStats;