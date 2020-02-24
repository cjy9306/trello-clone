import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import HeaderButton from './HeaderButton';
import { useHistory } from 'react-router-dom';
import CreateBoardModal from './CreateBoardModal';


const HeaderContainer = styled.div`
    height: 32px;
    padding: 8px 16px 8px 16px;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,.15)'};
    display: flex;
    justify-content: space-between;
    color: white;
`;

const TitleWrapper = styled.div`
    text-align: center;
    line-height: 32px;
`;

const MenuWrapper = styled.div`
    line-height: 32px;
    text-align: ${props => props.textAlign};
`;

const GlobalHeader = ({isLogined, backgroundColor}) => {

    const history = useHistory();
    const [boardModalVisible, setBoardModalVisible] = useState(false);

    const onClickHome = () => {
        const username = sessionStorage.getItem('username');
        history.push('/' + username + '/boards');
    };

    const onClickLogOut = () => {
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('memberId', null);
        sessionStorage.setItem('username', null);

        history.push('/');
    };


    const onCloseBoardModal = () => {
        setBoardModalVisible(false);
    }

    const onShowBoardModal = () => {
        setBoardModalVisible(true);
    }

    return (
        <HeaderContainer backgroundColor={backgroundColor}>
            <CreateBoardModal visible={boardModalVisible} onCloseModal={onCloseBoardModal} />
            <MenuWrapper textAlign='left' >
                <HeaderButton onClick={onClickHome}>Home</HeaderButton> &nbsp;
                <HeaderButton onClick={onShowBoardModal}>Create another board</HeaderButton>
            </MenuWrapper>
            <TitleWrapper >
                Trello Clone
            </TitleWrapper>
            <MenuWrapper textAlign='right'>
                { isLogined ? 
                    <HeaderButton type='default' onClick={onClickLogOut}>Log out</HeaderButton> 
                    : 
                    <HeaderButton>Login</HeaderButton> 
                }
            </MenuWrapper>
        </HeaderContainer>
    )
};

export default React.memo(GlobalHeader);