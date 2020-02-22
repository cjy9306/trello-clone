import React from 'react';
import { Route } from 'react-router-dom';
import BoardConatiner from './containers/board/BoardContainer';
import LoginContainer from './containers/auth/LoginContainer';
import MemberBoardsContainer from './containers/member/MemberBoardsContainer';
import './main.css'

function App() {
    return (
        <>
            <Route exact component={LoginContainer} path='/' />
            <Route exact component={MemberBoardsContainer} path='/:memberId/boards' />
            <Route exact component={BoardConatiner} path='/board/:boardId' />
        </>
    );
}

export default App;
