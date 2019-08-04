import React, { useState, useContext, useEffect } from 'react';
import UserContext from './context/userContext';
import { Badge, Progress, Button, UncontrolledCollapse, Col } from 'reactstrap';

const Detail = props => {

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

    // Toggle user info
    const toggler = () => {
        setIsOpen(!isOpen);
    };

    // Getting and setting state
    useEffect(() => {
        const getScoreTotal = () => {
            let sum = 0;
            let userMessages = props.online.userMessages;
            userMessages.map(userMessage => {
                sum = sum += userMessage;
                console.log(scoreTotal);
                return setScoreTotal(sum);
            });
        }
        getScoreTotal();
    }, [scoreTotal, props.online.userMessages])

    useEffect(() => {
        const getNeutralTotal = () => {
            let userMessages = props.online.userMessages;
            const neutralMessages = userMessages.filter(userMessage => userMessage === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
    }, [neutralTotal, props.online.userMessages])

    useEffect(() => {
        const getPositiveTotal = () => {
            let userMessages = props.online.userMessages;
            const positiveMessages = userMessages.filter(userMessage => userMessage > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
    }, [positiveTotal, props.online.userMessages])

    useEffect(() => {
        const getNegativeTotal = () => {
            let userMessages = props.online.userMessages;
            const negativeMessages = userMessages.filter(userMessage => userMessage < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
    }, [negativeTotal, props.online.userMessages])

    useEffect(() => {
        const getNeutralAvg = () => {
            let userMessages = props.online.userMessages;
            const neutralAverage = Math.round(neutralTotal / userMessages.length * 100);
            setNeutralAvg(neutralAverage);
            console.log('neutral %' + neutralAverage);
        }
        getNeutralAvg();
    }, [neutralAvg, neutralTotal, props.online.userMessages])

    useEffect(() => {
        const getPositiveAvg = () => {
            let userMessages = props.online.userMessages;
            const positiveAverage = Math.round(positiveTotal / userMessages.length * 100);
            setPositiveAvg(positiveAverage);
            console.log('positive %' + positiveAverage);
        }
        getPositiveAvg();
    }, [positiveAvg, positiveTotal, props.online.userMessages])

    useEffect(() => {
        const getNegativeAvg = () => {
            let userMessages = props.online.userMessages;
            const negativeAverage = Math.round(negativeTotal / userMessages.length * 100);
            setNegativeAvg(negativeAverage);
            console.log('negative %' + negativeAverage);
        }
        getNegativeAvg();
    }, [negativeAvg, negativeTotal, props.online.userMessages])

    return (
        <span>
            <h6 style={
                scoreTotal < 0
                    ? { display: 'inline' }
                    : { display: 'none' }}
            >
                <Badge
                    color="danger"
                    pill
                >
                    Negative {scoreTotal}
                        </Badge>
            </h6>
            <h6 style={
                scoreTotal === 0
                    ? { display: 'inline' }
                    : { display: 'none' }}
            >
                <Badge
                    color="warning"
                    pill
                >
                    Neutral {scoreTotal}
                    </Badge>
            </h6>
            <h6 style={
                scoreTotal > 0
                    ? { display: 'inline' }
                    : { display: 'none' }}
            >
                <Badge
                    color="success"
                    pill
                >
                    Positive {scoreTotal}
                    </Badge>
            </h6>
            <Button
                onClick={toggler}
                id={`${props.online.username}toggler`}
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
            <UncontrolledCollapse
                toggler={`#${props.online.username}toggler`}>
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
                            max={props.online.userMessages.length}
                        >
                            Positive {positiveTotal}
                        </Progress>
                        <Progress
                            color="warning"
                            value={neutralTotal}
                            aria-valuemin={0}
                            max={props.online.userMessages.length}
                        >
                            Neutral {neutralTotal}
                        </Progress>
                        <Progress
                            color="danger"
                            value={negativeTotal}
                            aria-valuemin={0}
                            max={props.online.userMessages.length}
                        >
                            Negative {negativeTotal}
                        </Progress>
                    </div>
                </Col>
            </UncontrolledCollapse>
        </span>
    );
}

export default Detail;