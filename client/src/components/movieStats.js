import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Progress } from 'reactstrap';

const MovieStats = props => {

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
        const comments = props.messages.filter(message => message.movie === props.title);
        setMovieMessages(comments);
        console.log('set movieMessages');
    }, [props.messages, props.title])

    useEffect(() => {
        const getScoreTotal = () => {
            let sum = 0;
            movieMessages.map(movieMessage => {
                sum = sum += movieMessage.result;
                return setScoreTotal(sum);
            });
        }
        getScoreTotal();
        console.log('movie score total');
    }, [movieMessages])

    useEffect(() => {
        const getNeutralTotal = () => {
            const neutralMessages = movieMessages.filter(movieMessage => movieMessage.result === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
        console.log('movie neutral total');
    }, [movieMessages])

    useEffect(() => {
        setNeutralAvg(Math.round(neutralTotal / movieMessages.length * 100));
        console.log('movie neutral %');
    }, [neutralAvg, neutralTotal, movieMessages.length])

    useEffect(() => {
        const getPositiveTotal = () => {
            const positiveMessages = movieMessages.filter(movieMessage => movieMessage.result > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
        console.log('movie positive total');
    }, [movieMessages])

    useEffect(() => {
        setPositiveAvg(Math.round(positiveTotal / movieMessages.length * 100));
        console.log('movie positive %');
    }, [positiveAvg, positiveTotal, movieMessages.length])

    useEffect(() => {
        const getNegativeTotal = () => {
            const negativeMessages = movieMessages.filter(movieMessage => movieMessage.result < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
        console.log('movie negative total');
    }, [movieMessages])

    useEffect(() => {
        setNegativeAvg(Math.round(negativeTotal / movieMessages.length * 100));
        console.log('movie negative %');
    }, [negativeAvg, negativeTotal, movieMessages.length])

    return (
        <div>
            <h6
            >
                Overall Rating: <Badge
                    color={scoreTotal === 0
                        ? "warning"
                        : scoreTotal < 0
                            ? "danger"
                            : scoreTotal > 0
                                ? "success"
                                : "dark"}
                >
                    {scoreTotal === 0
                        ? "Neutral"
                        : scoreTotal < 0
                            ? "Negative"
                            : scoreTotal > 0
                                ? "Positive"
                                : ""}
                </Badge>
            </h6>
            Average
        <Progress
                color="success"
                value={positiveAvg}
                max={100}
            >{
                    isNaN(positiveAvg)
                        ? `Positive: No Data`
                        : `Positive ${positiveAvg}%`
                }
            </Progress>
            <Progress
                color="warning"
                value={neutralAvg}
                max={100}
            >{
                    isNaN(neutralAvg)
                        ? `Neutral: No Data`
                        : `Neutral ${neutralAvg}%`
                }
            </Progress>
            <Progress
                color="danger"
                value={negativeAvg}
                max={100}
            >{
                    isNaN(negativeAvg)
                        ? `Negative: No Data`
                        : `Negative ${negativeAvg}%`
                }
            </Progress>
            Totals
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
                aria-valuemin={0}
                max={movieMessages.length}
            >
                Neutral {neutralTotal}
            </Progress>
            <Progress
                color="danger"
                value={negativeTotal}
                aria-valuemin={0}
                max={movieMessages.length}
            >
                Negative {negativeTotal}
            </Progress>
        </div>
    );
}

export default MovieStats;