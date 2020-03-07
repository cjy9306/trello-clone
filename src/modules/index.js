import { combineReducers } from 'redux';
import board from './board';
import auth from './auth';
import member from './member';
import team from './team';
import common from './common';

const rootReducer = combineReducers({
	board,
	auth,
	member,
	team,
	common
});

export default rootReducer;
