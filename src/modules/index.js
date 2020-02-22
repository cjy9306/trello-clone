import { combineReducers } from 'redux';
import board from './board';
import auth from './auth'
import member from './member'

const rootReducer = combineReducers({
    board,
    auth,
    member,
});

export default rootReducer;