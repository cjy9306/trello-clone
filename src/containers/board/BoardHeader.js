import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import HeaderButton from '../../components/HeaderButton';
import AddListModal from './AddListModal';
import BoardMembersModal from './BoardMembersModal';
import { useDispatch } from 'react-redux';
import { ConfirmModal } from '../../components/Modal';
import { deleteBoard } from '../../modules/board';
import { useHistory } from 'react-router-dom';

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

const DeleteBoardButton = styled(Button)`
    float: right;
`;

const BoardHeader = ({board}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [listModalVisible, setListModalVisible] = useState(false);
    const [membersModalVisible, setMembersModalVisible] = useState(false);
    const [deleteBoardModalVisible, setDeleteBoaordModalVisible] = useState(false);

    // list modal
    const onCloseListModal = () => setListModalVisible(false);
    const onShowListModal = () => setListModalVisible(true);

    // members modal
    const onCloseMembersModal = () => setMembersModalVisible(false);
    const onShowMembersModal = () => setMembersModalVisible(true);

    const onShowDeleteModal = () => setDeleteBoaordModalVisible(true);
    const onCloseDeleteModal = () => setDeleteBoaordModalVisible(false);

    const onDeleteBoard = async () => {
        const result = await dispatch(deleteBoard({boardId: board.board_id}));

        if (result.success) {
            const memberId = sessionStorage.getItem('memberId');
            history.push('/member/' + memberId + '/boards');
        } else {
            console.log('delete board fail');
        }
    };

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
                <ConfirmModal 
                    visible={deleteBoardModalVisible} 
                    onCloseModal={onCloseDeleteModal} 
                    message='Are you sure delete this board?' 
                    onClickOk={onDeleteBoard} />
                <DeleteBoardButton type='danger' onClick={onShowDeleteModal}>Delete Board</DeleteBoardButton>
            </MenuContainer>
        </BoardHeaderContainer>
    )
};

export default React.memo(BoardHeader);