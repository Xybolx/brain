import { useState, useCallback } from "react";

const useBoolean = initial => {
    const [value, setValue] = useState(initial);

    const setToggle = useCallback(() => setValue(value => !value), []);

    return [value, setToggle];
}

export default useBoolean;
