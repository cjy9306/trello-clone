import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { getAllBoards } from '../../modules/board';
import { useDispatch, useSelector } from 'react-redux';
import BoardTitleBox from './BoardTitleBox';
import GlobalHeader from '../../components/GlobalHeader';
import useCheckWhetherIsLogined from '../../components/useCheckWhetherIsLogined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';


const Container = styled.div`
    width: 860px;
    margin: 20px auto;
`;

const PersonalContainer = styled.div`
    margin: 20px auto;
`;

const BoardListHeader = styled.div`
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin: 0 0 12px 12px;
`;
const BoardContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const TeamListContainer = styled.div`

`;

const TeamContainer = styled.div`

`;

const TeamContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const CustomIcon = styled(FontAwesomeIcon)`
    font-size: 16px;
    margin-right: 16px;
`;

const MemberBoardsContainer = () => {
    const isLogined = useCheckWhetherIsLogined();

    const dispatch = useDispatch();
    const personalBoards = useSelector(state => state.board.personalBoards);
    const teamBoards = useSelector(state => state.board.teamBoards);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const member_id = sessionStorage.getItem('memberId');
        dispatch(getAllBoards({token, member_id}));

    }, [dispatch])

    return (
        <>
        <GlobalHeader isLogined={isLogined} backgroundColor={'#026aa7'} />
        <Container>
            <PersonalContainer>
                <BoardListHeader>
                    <CustomIcon icon={faUser} size='xs'/>
                    Personal Boards
                </BoardListHeader>
                <BoardContent>
                {
                    personalBoards &&
                    personalBoards.map(board => <BoardTitleBox board={board} key={board.board_id}/>)
                }
                </BoardContent>
            </PersonalContainer>
            <TeamListContainer>
                {
                    teamBoards &&
                    teamBoards.map(team => {
                        return (
                            <TeamContainer key={team.team_id}>
                                <BoardListHeader>
                                    <CustomIcon icon={faUserFriends} size='xs'/>
                                    {team.team_name}
                                </BoardListHeader>
                                <BoardContent>
                                {
                                    team.boards &&
                                    team.boards.map(board => <BoardTitleBox board={board} key={board.board_id}/>)
                                }
                                </BoardContent>
                            </TeamContainer>
                            
                        );
                    })
                }
            </TeamListContainer>
        </Container>
        </>
    )
};

export default React.memo(MemberBoardsContainer);