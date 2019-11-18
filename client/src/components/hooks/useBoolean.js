import { useState, useCallback } from "react";

const useBoolean = initial => {
    const [value, setValue] = useState(initial);

    const setToggle = useCallback(() => setValue(value => !value), []);

    const setTrue = useCallback(() => setValue(true), []);

    const setFalse = useCallback(() => setValue(false), []);

    return [value, setToggle, setTrue, setFalse];
}

export default useBoolean;
