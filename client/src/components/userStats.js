import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Badge, Progress, Modal, ModalBody } from 'reactstrap';
import UserContext from '../context/userContext';
import useUserStats from "../components/useUserStats";
import StatTitle from '../components/statTitle';
import Btn from '../components/btn';

const UserStats = ({ online, getUsers }) => {

    // Context
    const { user } = useContext(UserContext);

    // State
    const [messages, setMessages] = useState([]);
    const [scoreTotal, neutralTotal, positiveTotal, negativeTotal, neutralAvg, positiveAvg, negativeAvg] = useUserStats(messages)
    const [isOpen, setIsOpen] = useState(false);

    // Memo
    useMemo(() => ({ messages, setMessages }), [messages, setMessages]);

    // Toggle user stats
    const toggle = () => {
        setIsOpen(!isOpen);
        getUsers();
    };

    // Getting and setting state
    useEffect(() => {
        setMessages(online.userMessages);
    }, [online.userMessages])

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
                            max={messages.length}
                        >
                            Positive {positiveTotal}
                        </Progress>
                        <Progress
                            color="warning"
                            value={neutralTotal}
                            max={messages.length}
                        >
                            Neutral {neutralTotal}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeTotal}
                            max={messages.length}
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