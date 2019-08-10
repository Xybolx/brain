import React, { useState, useContext, useEffect, useMemo } from 'react';
import UserContext from '../context/userContext';
import { Badge, Progress, Button, Collapse, Col } from 'reactstrap';

const UserStats = ({ online }) => {

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
    };

    // Getting and setting state
    useEffect(() => {
        setMsgs(online.userMessages);
        console.log('user set msgs');
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
        console.log('user score total');
    }, [msgs])
    
    useEffect(() => {
        const getNeutralTotal = () => {
            const neutralMessages = msgs.filter(userMessage => userMessage === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
        console.log('user neutral total');
    }, [msgs])

    useEffect(() => {
            setNeutralAvg(Math.round(neutralTotal / msgs.length * 100));
            console.log('user neutral %');
    }, [neutralAvg, neutralTotal, msgs.length])

    useEffect(() => {
        const getPositiveTotal = () => {
            const positiveMessages = msgs.filter(userMessage => userMessage > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
        console.log('user positive total');
    }, [msgs])

    useEffect(() => {
            setPositiveAvg(Math.round(positiveTotal / msgs.length * 100));
            console.log('user positive %');
    }, [positiveAvg, positiveTotal, msgs.length])

    useEffect(() => {
        const getNegativeTotal = () => {
            const negativeMessages = msgs.filter(userMessage => userMessage < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
        console.log('user negative total');
    }, [msgs])

    useEffect(() => {
            setNegativeAvg(Math.round(negativeTotal / msgs.length * 100));
            console.log('user negative %');
    }, [negativeAvg, negativeTotal, msgs.length])

    return (
        <span>
            <h6 style={{ display: "inline" }}>
                <Badge
                    color={scoreTotal === 0 ? "warning" : scoreTotal < 0 ? "danger" : scoreTotal > 0 ? "success" : "dark"}
                >
                    {scoreTotal === 0 ? "Neutral" : scoreTotal < 0 ? "Negative" : scoreTotal > 0 ? "Positive" : "No Data"}
                </Badge>
            </h6>
            <Button
                onClick={toggle}
                style={
                    !user.userMessages.length
                        ? { display: 'none' }
                        : { display: 'inline' }}
                type="button"
                color="link"
                size="sm"
            >
                <i className="fas fa-poll-h" />
                <span style={
                    { marginLeft: 2 }}
                >
                    {isOpen ? 'Close' : 'Stats'}
                </span>
            </Button>
            <Collapse
                isOpen={isOpen}
            >
                <Col sm="12">
                    <div>
                        Average
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
                    </div>
                    <div>
                        Totals
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
                            aria-valuemin={0}
                            max={msgs.length}
                        >
                            Neutral {neutralTotal}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeTotal}
                            aria-valuemin={0}
                            max={msgs.length}
                        >
                            Negative {negativeTotal}
                        </Progress>
                    </div>
                </Col>
            </Collapse>
        </span>
    );
}

export default UserStats;