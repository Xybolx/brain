import { useState, useEffect } from "react";

const useStats = statMessages => {
    
    // state
    const [scoreTotal, setScoreTotal] = useState(0);
    const [neutralTotal, setNeutralTotal] = useState(0);
    const [positiveTotal, setPositiveTotal] = useState(0);
    const [negativeTotal, setNegativeTotal] = useState(0);
    const [neutralAvg, setNeutralAvg] = useState(0);
    const [positiveAvg, setPositiveAvg] = useState(0);
    const [negativeAvg, setNegativeAvg] = useState(0);

    useEffect(() => {
        const getScoreTotal = () => {
            let sum = 0;
            statMessages.map(message => {
                sum = sum += message.result;
                return setScoreTotal(sum);
            });
        }
        getScoreTotal();
    }, [statMessages])

    useEffect(() => {
        const getNeutralTotal = () => {
            const neutralMessages = statMessages.filter(message => message.result === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
    }, [statMessages])

    useEffect(() => {
        setNeutralAvg(Math.round(neutralTotal / statMessages.length * 100));
    }, [neutralAvg, neutralTotal, statMessages.length])

    useEffect(() => {
        const getPositiveTotal = () => {
            const positiveMessages = statMessages.filter(message => message.result > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
    }, [statMessages])

    useEffect(() => {
        setPositiveAvg(Math.round(positiveTotal / statMessages.length * 100));
    }, [positiveAvg, positiveTotal, statMessages.length])

    useEffect(() => {
        const getNegativeTotal = () => {
            const negativeMessages = statMessages.filter(message => message.result < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
    }, [statMessages])

    useEffect(() => {
        setNegativeAvg(Math.round(negativeTotal / statMessages.length * 100));
    }, [negativeAvg, negativeTotal, statMessages.length])

    return [scoreTotal, neutralTotal, positiveTotal, negativeTotal, neutralAvg, positiveAvg, negativeAvg]

}

export default useStats;