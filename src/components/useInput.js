import { useState, useCallback } from 'react';

const useInput = (defaultValue) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const onChange = useCallback(e => {
        setInputValue(e.target.value);
    },[]);
    return [inputValue, onChange, setInputValue];
};

export default useInput;