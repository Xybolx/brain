import React, { useState, useContext, useEffect } from 'react';
import UserContext from './userContext';
import { Badge, Progress, Button } from 'reactstrap';
import API from '../utils/API';

const Detail = props => {

    // Context
    const { user } = useContext(UserContext);

    // State 
    const [scoreTotal, setScoreTotal] = useState('');

    const [neutralTotal, setNeutralTotal] = useState('');

    const [positiveTotal, setPositiveTotal] = useState('');

    const [negativeTotal, setNegativeTotal] = useState('');

    const [isHidden, setIsHidden] = useState(true);

    const toggleHidden = () => {
        if (isHidden) {
            setIsHidden(false);
        } else {
            setIsHidden(true);
        }
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

    return (
        <span>
            <Button style={!user.userMessages.length ? { display: 'none' } : { display: 'inline' }} onClick={toggleHidden}  disabled={!props.online.userMessages.length} type="button" color="link" size="sm">{isHidden ? "➪ Details" : "⇳ Details"}</Button>
            <div style={isHidden ? { display: 'none' } : { display: 'block' }}>
                <h6>Sentiment</h6>
                <div>
                    <h6 style={scoreTotal < 0 ? { display: 'block' } : { display: 'none' }}>Overall:<span className="hello" style={{ color: "red" }}><Badge color="danger">Negative {scoreTotal}</Badge></span></h6>
                    <h6 style={scoreTotal === 0 ? { display: 'block' } : { display: 'none' }}>Overall:<span className="hello" style={{ color: "gold" }}><Badge color="warning">Neutral {scoreTotal}</Badge></span></h6>
                    <h6 style={scoreTotal > 0 ? { display: 'block' } : { display: 'none' }}>Overall:&nbsp;<span className="hello" style={{ color: "green" }}><Badge color="success">Positive {scoreTotal}</Badge></span></h6>
                    <div>
                        <h6>Sentiment History</h6>
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
                </div>
            </div>
        </span>
    );
}

export default Detail;