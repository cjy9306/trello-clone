import { combineReducers } from 'redux';
import board from './board';
import auth from './auth'
import member from './member'
import team from './team';

const rootReducer = combineReducers({
    board,
    auth,
    member,
    team,
});

export default rootReducer;