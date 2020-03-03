import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { getAllBoards } from '../../modules/member';
import { useDispatch, useSelector } from 'react-redux';
import BoardTitleBox from './BoardTitleBox';
import GlobalHeader from '../../components/GlobalHeader';
import useCheckWhetherIsLogined from '../../components/useCheckWhetherIsLogined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import CreateBoardModal from '../../components/CreateBoardModal';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';


const Container = styled.div`
    width: 860px;
    margin: 20px auto;
`;

const BoardListContainer = styled.div`
    margin: 20px auto;
`;

const BoardListHeader = styled.div`
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0 0 0 2%;
    margin-bottom: 12px;
    box-sizing: border-box;
`;

const BoardContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const TeamContainer = styled.div`

`;

const CreateBoardBox = styled.div`
    width: 21.5%;
    margin: 0 2% 2% 0;
    box-sizing: border-box;
    padding: auto 8px;
    height: 96px;
    line-height: 96px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    background-color: rgba(9, 30, 66, .07);
    &:hover {
        background-color: rgba(9, 30, 66, .17);
    }
`;

const CustomIcon = styled(FontAwesomeIcon)`
    font-size: 16px;
    margin-right: 16px;
`;

const SettingsButton = styled(Button)`
    float: right;
`;

const MemberBoardsContainer = () => {
    const isLogined = useCheckWhetherIsLogined();
    const dispatch = useDispatch();
    const history = useHistory();
    const personalBoards = useSelector(state => state.member.personalBoards);
    const teamBoards = useSelector(state => state.member.teamBoards);

    const [boardModalVisible, setBoardModalVisible] = useState(false);

    useEffect(() => {
        const member_id = sessionStorage.getItem('memberId');
        dispatch(getAllBoards({member_id}));

    }, [dispatch]);

    // create board modal
    const onCloseBoardModal = () => {
        setBoardModalVisible(false);
    }

    const onShowBoardModal = () => {
        setBoardModalVisible(true);
    }

    const onClickSettings = (teamId) => {
        history.push('/team/' + teamId + '/settings');
    }

    return (
        <>
        <GlobalHeader isLogined={isLogined} backgroundColor={'#026aa7'} />
        <Container>
            <BoardListContainer>
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
            </BoardListContainer>
            <BoardListContainer>
            <CreateBoardModal visible={boardModalVisible} onCloseModal={onCloseBoardModal} />
                {
                    teamBoards &&
                    teamBoards.map(team => {
                        return (
                            <TeamContainer key={team.team_id}>
                                <BoardListHeader>
                                    <CustomIcon icon={faUserFriends} size='xs'/>
                                    {team.team_name}&nbsp;
                                    <SettingsButton type='default' onClick={() => onClickSettings(team.team_id)}>Settings</SettingsButton>
                                </BoardListHeader>
                                <BoardContent>
                                {
                                    team.boards && team.boards.length > 0 &&
                                    team.boards.map(board => <BoardTitleBox board={board} key={board.board_id}/>)
                                }
                                {
                                    team.boards && team.boards.length === 0 &&
                                    <CreateBoardBox onClick={onShowBoardModal}>
                                        Create a new board
                                    </CreateBoardBox>
                                }
                                </BoardContent>
                            </TeamContainer>
                            
                        );
                    })
                }
            </BoardListContainer>
        </Container>
        </>
    )
};

export default React.memo(MemberBoardsContainer);