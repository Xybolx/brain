import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Progress } from 'reactstrap';
import StatTitle from './statTitle';

const MovieStats = ({ title, messages }) => {

    // State
    const [movieMessages, setMovieMessages] = useState([]);
    const [scoreTotal, setScoreTotal] = useState('');
    const [neutralTotal, setNeutralTotal] = useState('');
    const [positiveTotal, setPositiveTotal] = useState('');
    const [negativeTotal, setNegativeTotal] = useState('');
    const [neutralAvg, setNeutralAvg] = useState('');
    const [positiveAvg, setPositiveAvg] = useState('');
    const [negativeAvg, setNegativeAvg] = useState('');

    // Memo
    useMemo(() => ({ movieMessages, setMovieMessages }), [movieMessages, setMovieMessages]);

    // Get and set state
    useEffect(() => {
        const comments = messages.filter(message => message.movie === title);
        setMovieMessages(comments);
    }, [messages, title])

    useEffect(() => {
        const getScoreTotal = () => {
            let sum = 0;
            movieMessages.map(movieMessage => {
                sum = sum += movieMessage.result;
                return setScoreTotal(sum);
            });
        }
        getScoreTotal();
    }, [movieMessages])

    useEffect(() => {
        const getNeutralTotal = () => {
            const neutralMessages = movieMessages.filter(movieMessage => movieMessage.result === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
    }, [movieMessages])

    useEffect(() => {
        setNeutralAvg(Math.round(neutralTotal / movieMessages.length * 100));
    }, [neutralAvg, neutralTotal, movieMessages.length])

    useEffect(() => {
        const getPositiveTotal = () => {
            const positiveMessages = movieMessages.filter(movieMessage => movieMessage.result > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
    }, [movieMessages])

    useEffect(() => {
        setPositiveAvg(Math.round(positiveTotal / movieMessages.length * 100));
    }, [positiveAvg, positiveTotal, movieMessages.length])

    useEffect(() => {
        const getNegativeTotal = () => {
            const negativeMessages = movieMessages.filter(movieMessage => movieMessage.result < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
    }, [movieMessages])

    useEffect(() => {
        setNegativeAvg(Math.round(negativeTotal / movieMessages.length * 100));
    }, [negativeAvg, negativeTotal, movieMessages.length])

    return (
        <div className="statsTitle" style={{ textAlign: "center" }}>
            <StatTitle
                header={title}
                icon={<i className="fas fa-film" />}
            />
            <StatTitle
                header="Overall Rating:"
                badge={<Badge color={scoreTotal === 0 ? "warning" : scoreTotal < 0 ? "danger" : scoreTotal > 0 ? "success" : "dark"} pill><i className="fas fa-poll-h" /> {scoreTotal === 0 ? "Neutral" : scoreTotal < 0 ? "Negative" : scoreTotal > 0 ? "Positive" : "No Data"}</Badge>}
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
                    max={movieMessages.length}
                >
                    Positive {positiveTotal}
                </Progress>
                <Progress
                    color="warning"
                    value={neutralTotal}
                    max={movieMessages.length}
                >
                    Neutral {neutralTotal}
                </Progress>
                <Progress
                    color="danger"
                    value={negativeTotal}
                    max={movieMessages.length}
                >
                    Negative {negativeTotal}
                </Progress>
        </div>
    );
}

export default MovieStats;