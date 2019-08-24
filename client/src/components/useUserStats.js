import { useState, useEffect } from "react";

const useUserStats = messages => {
    
    // state
    const [scoreTotal, setScoreTotal] = useState('');
    const [neutralTotal, setNeutralTotal] = useState('');
    const [positiveTotal, setPositiveTotal] = useState('');
    const [negativeTotal, setNegativeTotal] = useState('');
    const [neutralAvg, setNeutralAvg] = useState('');
    const [positiveAvg, setPositiveAvg] = useState('');
    const [negativeAvg, setNegativeAvg] = useState('');

    useEffect(() => {
        const getScoreTotal = () => {
            let sum = 0;
            messages.map(message => {
                sum = sum += message;
                return setScoreTotal(sum);
            });
        }
        getScoreTotal();
    }, [messages])

    useEffect(() => {
        const getNeutralTotal = () => {
            const neutralMessages = messages.filter(message => message === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
    }, [messages])

    useEffect(() => {
        setNeutralAvg(Math.round(neutralTotal / messages.length * 100));
    }, [neutralAvg, neutralTotal, messages.length])

    useEffect(() => {
        const getPositiveTotal = () => {
            const positiveMessages = messages.filter(message => message > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
    }, [messages])

    useEffect(() => {
        setPositiveAvg(Math.round(positiveTotal / messages.length * 100));
    }, [positiveAvg, positiveTotal, messages.length])

    useEffect(() => {
        const getNegativeTotal = () => {
            const negativeMessages = messages.filter(message => message < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
    }, [messages])

    useEffect(() => {
        setNegativeAvg(Math.round(negativeTotal / messages.length * 100));
    }, [negativeAvg, negativeTotal, messages.length])

    return [scoreTotal, neutralTotal, positiveTotal, negativeTotal, neutralAvg, positiveAvg, negativeAvg]

}

export default useUserStats;