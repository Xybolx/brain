import React, { useState, useContext, useEffect } from 'react';
import { Badge, Progress, Modal, ModalBody } from 'reactstrap';
import UserContext from '../context/userContext';
import useStats from "../components/useStats";
import StatTitle from './statTitle';
import Btn from './button/btn';

const UserStats = ({ online, getUsers, messages }) => {

    // Context
    const { user } = useContext(UserContext);

    // State
    const [statMessages, setStatMessages] = useState([]);
    const [scoreTotal, neutralTotal, positiveTotal, negativeTotal, neutralAvg, positiveAvg, negativeAvg] = useStats(statMessages);
    const [isOpen, setIsOpen] = useState(false);

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
                            header={online.username}
                            icon={<i className="fas fa-user" />}
                        />
                        <StatTitle
                            header="Overall Rating:"
                            badge={
                                <Badge
                                    color={
                                        scoreTotal === 0
                                            ? "warning"
                                            : scoreTotal < 0
                                                ? "danger"
                                                : scoreTotal > 0
                                                    ? "success" : "dark"}
                                    pill
                                >
                                    <i className="fas fa-poll-h" /> {scoreTotal === 0
                                        ? "Neutral"
                                        : scoreTotal < 0
                                            ? "Negative"
                                            : scoreTotal > 0
                                                ? "Positive"
                                                : "No Data"}
                                </Badge>}
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
                            {isNaN(positiveAvg) ? `Positive: No Data` : `Positive ${positiveAvg}%`}
                        </Progress>
                        <Progress
                            color="warning"
                            value={neutralAvg}
                            max={100}
                        >
                            {isNaN(neutralAvg) ? `Neutral: No Data` : `Neutral ${neutralAvg}%`}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeAvg}
                            max={100}
                        >
                            {isNaN(negativeAvg) ? `Negative: No Data` : `Negative ${negativeAvg}%`}
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
                            Positive {positiveTotal}
                        </Progress>
                        <Progress
                            color="warning"
                            value={neutralTotal}
                            max={statMessages.length}
                        >
                            Neutral {neutralTotal}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeTotal}
                            max={statMessages.length}
                        >
                            Negative {negativeTotal}
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