import React, { useState, useEffect } from 'react';
import { Badge, Progress } from 'reactstrap';
import useStats from "../../components/useStats";
import StatTitle from '../statTitle';

const MovieStats = ({ title, messages }) => {

    // State
    const [statMessages, setStatMessages] = useState([]);
    const [scoreTotal, neutralTotal, positiveTotal, negativeTotal, neutralAvg, positiveAvg, negativeAvg] = useStats(statMessages);

    // Get and set state
    useEffect(() => {
        const comments = messages.filter(message => message.movie === title);
        setStatMessages(comments);
    }, [title, messages])

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
        </div>
    );
}

export default MovieStats;