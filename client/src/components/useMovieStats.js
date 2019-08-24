import { useState, useEffect } from "react";

const useMovieStats = movieMessages => {

    // state
    const [neutralTotal, setNeutralTotal] = useState('');
    const [positiveTotal, setPositiveTotal] = useState('');
    const [negativeTotal, setNegativeTotal] = useState('');
    const [neutralAvg, setNeutralAvg] = useState('');
    const [positiveAvg, setPositiveAvg] = useState('');
    const [negativeAvg, setNegativeAvg] = useState('');

    useEffect(() => {
        const getNeutralTotal = () => {
            const neutralMessages = movieMessages.filter(message => message.result === 0);
            setNeutralTotal(neutralMessages.length);
        }
        getNeutralTotal();
    }, [movieMessages])

    useEffect(() => {
        setNeutralAvg(Math.round(neutralTotal / movieMessages.length * 100));
    }, [neutralAvg, neutralTotal, movieMessages.length])

    useEffect(() => {
        const getPositiveTotal = () => {
            const positiveMessages = movieMessages.filter(message => message.result > 0);
            setPositiveTotal(positiveMessages.length);
        }
        getPositiveTotal();
    }, [movieMessages])

    useEffect(() => {
        setPositiveAvg(Math.round(positiveTotal / movieMessages.length * 100));
    }, [positiveAvg, positiveTotal, movieMessages.length])

    useEffect(() => {
        const getNegativeTotal = () => {
            const negativeMessages = movieMessages.filter(message => message.result < 0);
            setNegativeTotal(negativeMessages.length);
        }
        getNegativeTotal();
    }, [movieMessages])

    useEffect(() => {
        setNegativeAvg(Math.round(negativeTotal / movieMessages.length * 100));
    }, [negativeAvg, negativeTotal, movieMessages.length])

    return [neutralTotal, positiveTotal, negativeTotal, neutralAvg, positiveAvg, negativeAvg]

}

export default useMovieStats;