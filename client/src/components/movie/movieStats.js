import React, { useState, useEffect } from 'react';
import { Badge, Progress } from 'reactstrap';
import useStats from "../useStats";
import StatTitle from '../headers/statTitle';
import ProgTitle from '../progTitle';

const MovieStats = ({ title, messages }) => {

    // State
    const [statMessages, setStatMessages] = useState([]);
    const [
        scoreTotal,
        neutralTotal,
        positiveTotal,
        negativeTotal,
        neutralAvg,
        positiveAvg,
        negativeAvg
    ] = useStats(statMessages);

    // Get and set state
    useEffect(() => {
        const msgFilter = messages.filter(message => message.movie === title);
        setStatMessages(msgFilter);
    }, [title, messages])

    return (
        <div className="statsTitle" style={{ textAlign: "center" }}>
            <StatTitle
                icon={<i className="fas fa-film" />}
                header={title}
            />
            <StatTitle
                icon={<i className="fas fa-balance-scale" />}
                header="FilmBrains Score:"
                badge={
                    <Badge
                        color={
                            scoreTotal === 0
                                ? "warning"
                                : scoreTotal < 0
                                    ? "danger"
                                    : scoreTotal > 0
                                        ? "success"
                                        : "dark"
                        }
                        pill
                    >
                        {scoreTotal > 0 ? `+ ${scoreTotal}` : scoreTotal < 0 ? `${scoreTotal}` : "Even"}
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
        </div>
    );
}

export default MovieStats;