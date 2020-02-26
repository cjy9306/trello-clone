import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderButton from '../../components/HeaderButton';
import AddListModal from './AddListModal';

const BoardHeaderContainer = styled.div`
    height: 24px;
    padding: 8px 16px 8px 16px;
    display: flex;
    justify-content: space-between;
`;

const MenuContainer = styled.div`
    width: 100%;
    color: black;
`;

const MenuWrapper = styled.div`
    display: inline-block;
    margin-right: 16px;
`;

const BoardHeader = ({board}) => {

    const [listModalVisible, setListModalVisible] = useState(false);

    const onCloseModal = () => {
        setListModalVisible(false);
    }

    const onShowModal = () => {
        setListModalVisible(true);
    }

    return (
        <BoardHeaderContainer>
            <AddListModal visible={listModalVisible} onCloseModal={onCloseModal} />
            <MenuContainer>
                <MenuWrapper >
                    {board.board_name}
                </MenuWrapper>
                <MenuWrapper>
                    {board.public_scope}
                </MenuWrapper>
                <MenuWrapper>
                    <HeaderButton onClick={onShowModal}>Add another list</HeaderButton> &nbsp;
                    <HeaderButton onClick={onShowModal}>Members</HeaderButton>
                </MenuWrapper>
            </MenuContainer>
            <MenuContainer>
                
            </MenuContainer>
        </BoardHeaderContainer>
    )
};

export default React.memo(BoardHeader);