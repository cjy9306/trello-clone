import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const useCheckWhetherIsLogined = () => {
    const history = useHistory();
    const [isLogined, setIsLogined] = useState(false);
    
    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            alert('invalid access, please login');
            history.push('/');
        } else {
            setIsLogined(true);
        }
    }, [history])

    return isLogined;
};

export default useCheckWhetherIsLogined;