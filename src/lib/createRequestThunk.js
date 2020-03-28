import { setMessageStates } from '../modules/common';

export default function createRequestThunk(type, request) {
	const SUCCESS = `${type}_SUCCESS`;
	const FAIL = `${type}_FAIL`;

	return params => async dispatch => {
		console.log('type ; ' + type + ' params ; ' + JSON.stringify(params));
		dispatch({ type }); // start

		try {
			const response = await request(params);
			console.log('response.data ; ' + JSON.stringify(response.data));
			if (response.data === undefined) {
				throw new Error('invalid http request');
			}
			dispatch({
				type: SUCCESS,
				payload: response.data.data
			});

			return { success: true, data: response.data };
		} catch (e) {
			const error = e.response ? e.response.data : '서버에 연결할 수 없습니다.';
			dispatch({
				type: FAIL,
				payload: error,
				error: true
			});

			console.log('inCreateRequest , error ; ' + JSON.stringify(e.response));
			dispatch(setMessageStates(true, 'error', error));
			if (error === undefined) return { success: false, data: '서버에 연결할 수 없습니다.' };
			else return { success: false, data: error };
		}
	};
}
