import React from 'react';
import { Route } from 'react-router-dom';
import BoardConatiner from './containers/board/BoardContainer';
import LoginContainer from './containers/auth/LoginContainer';
import MemberBoardsContainer from './containers/member/MemberBoardsContainer';
import TeamSettingsContainer from './containers/Team/TeamSettingsContainer';
import './main.css';
import dotenv from 'dotenv';

dotenv.config();

function App() {
	return (
		<>
			<Route exact component={LoginContainer} path="/" />
			<Route exact component={MemberBoardsContainer} path="/member/:memberId/boards" />
			<Route exact component={TeamSettingsContainer} path="/team/:teamId/settings" />
			<Route exact component={BoardConatiner} path="/board/:boardId" />
		</>
	);
}

export default App;
