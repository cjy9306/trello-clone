import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setMessageStates } from '../modules/common';
import { useDispatch } from 'react-redux';

/*
 *	사용자가 로그인 되어 있는지 아닌지를 판별하는 hook
 *
 */
const useCheckWhetherIsLogined = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [isLogined, setIsLogined] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem('token') === null) {
			dispatch(setMessageStates(true, 'error', 'Invalid access. please login'));
			history.push('/');
		} else {
			setIsLogined(true);
		}
	}, [history]);

	return isLogined;
};

export default useCheckWhetherIsLogined;
