import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderButton from '../../components/HeaderButton';
import AddListModal from './AddListModal';
import BoardMembersModal from './BoardMembersModal';
import { getBoardMembers } from '../../modules/board';
import { useDispatch } from 'react-redux';

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

    const dispatch = useDispatch();
    const [listModalVisible, setListModalVisible] = useState(false);
    const [membersModalVisible, setMembersModalVisible] = useState(false);

    // list modal
    const onCloseListModal = () => setListModalVisible(false);
    const onShowListModal = () => setListModalVisible(true);

    // members modal
    const onCloseMembersModal = () => setMembersModalVisible(false);
    const onShowMembersModal = () => setMembersModalVisible(true);

    

    return (
        <BoardHeaderContainer>
            <BoardMembersModal visible={membersModalVisible} onCloseModal={onCloseMembersModal} />
            <AddListModal visible={listModalVisible} onCloseModal={onCloseListModal} />
            <MenuContainer>
                <MenuWrapper >
                    {board.board_name}
                </MenuWrapper>
                <MenuWrapper>
                    {board.public_scope}
                </MenuWrapper>
                <MenuWrapper>
                    <HeaderButton onClick={onShowListModal}>Add another list</HeaderButton> &nbsp;
                    <HeaderButton onClick={onShowMembersModal}>Members</HeaderButton>
                </MenuWrapper>
            </MenuContainer>
            <MenuContainer>
                
            </MenuContainer>
        </BoardHeaderContainer>
    )
};

export default React.memo(BoardHeader);