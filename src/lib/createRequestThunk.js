export default function createRequestThunk(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAIL = `${type}_FAIL`;

    return params => async dispatch => {
        console.log('params ; ' + JSON.stringify(params));
        dispatch({type}); // start

        try {
            const response = await request(params);
            console.log('response.data ; ' + JSON.stringify(response.data))
            if (response.data === undefined) {
                throw new Error('invalid http request');
            }
            dispatch({
                type: SUCCESS,
                payload: response.data.data
            });

            return {success: true, data: response.data};
        } catch (e) {
            dispatch({
                type: FAIL,
                payload: e.response.data,
                error: true
            });

            console.log('inCreateRequest , error ; ' + JSON.stringify(e.response.data))
            return {success: false, data: e.response.data.data}; 
        }
        
    };
}