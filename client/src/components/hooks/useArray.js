import { useCallback, useState } from "react";

const useArray = initial => {
    const [value, setValue] = useState(initial);

    const addValue = useCallback(addedValue => setValue(value => [...value, addedValue]), []);

    const removeById = useCallback(id => setValue(arr => arr.filter(value => value && value._id !== id)), []);

    const clear = useCallback(() => setValue(() => []), []);

    return [value, setValue, addValue, removeById, clear];
}

export default useArray;