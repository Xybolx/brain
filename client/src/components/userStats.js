import React, { useState, useContext, useEffect, useMemo } from 'react';
import UserContext from '../context/userContext';
import StatTitle from '../components/statTitle';
import Btn from '../components/btn';
import { Badge, Progress, Modal, ModalBody } from 'reactstrap';

const UserStats = ({ online, getUsers }) => {

    // Context
    const { user } = useContext(UserContext);

    // State 
    const [scoreTotal, setScoreTotal] = useState('');
    const [neutralTotal, setNeutralTotal] = useState('');
    const [positiveTotal, setPositiveTotal] = useState('');
    const [negativeTotal, setNegativeTotal] = useState('');
    const [neutralAvg, setNeutralAvg] = useState('');
    const [positiveAvg, setPositiveAvg] = useState('');
    const [negativeAvg, setNegativeAvg] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [msgs, setMsgs] = useState([]);

    // Memo
    useMemo(() => ({ msgs, setMsgs }), [msgs, setMsgs]);

    // Toggle user stats
    const toggle = () => {
        setIsOpen(!isOpen);
        getUsers();
    };

    // Getting and setting state
    useEffect(() => {
        setMsgs(online.userMessages);
    }, [online.userMessages])

    useEffect(() => {
        const getScoreTotal = () => {
            let sum = 0;
            msgs.map(msg => {
                sum = sum += msg;
                return setScoreTotal(sum);
            });
        }
        getScoreTotal();
    }, [msgs])

    useEffect(() => {
        const getNeutralTotal = () => {
            const neutralMessages = msgs.filter(userMessage => userMessage === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
    }, [msgs])

    useEffect(() => {
        setNeutralAvg(Math.round(neutralTotal / msgs.length * 100));
    }, [neutralAvg, neutralTotal, msgs.length])

    useEffect(() => {
        const getPositiveTotal = () => {
            const positiveMessages = msgs.filter(userMessage => userMessage > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
    }, [msgs])

    useEffect(() => {
        setPositiveAvg(Math.round(positiveTotal / msgs.length * 100));
    }, [positiveAvg, positiveTotal, msgs.length])

    useEffect(() => {
        const getNegativeTotal = () => {
            const negativeMessages = msgs.filter(userMessage => userMessage < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
    }, [msgs])

    useEffect(() => {
        setNegativeAvg(Math.round(negativeTotal / msgs.length * 100));
    }, [negativeAvg, negativeTotal, msgs.length])

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
                            max={msgs.length}
                        >
                            Positive {positiveTotal}
                        </Progress>
                        <Progress
                            color="warning"
                            value={neutralTotal}
                            max={msgs.length}
                        >
                            Neutral {neutralTotal}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeTotal}
                            max={msgs.length}
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