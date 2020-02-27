import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import useInput from '../../components/useInput';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { getBoardMembers, addBoardMember, deleteBoardMember } from '../../modules/board';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import member from '../../modules/member';

const MembersModal = styled(Modal)`
    width: 380px;
    min-height: 150px;
    border-radius: 3px;
`;

const AddMemberContainer = styled.div`
    border-radius: 3px;
    padding: 16px 32px 0 16px;
`;

const MemberListContainer = styled.div`
    border-radius: 3px;
    padding: 12px 32px 0 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
`;

const TitleWrapper = styled.div`
    height: 32px;
    line-height: 32px;
    margin-bottom: 8px;
    padding-left: 4px;
`;

const EmailInput = styled.input`
    height: 32px;
    width: 80%;
    background-color: #fafbfc;
    border: none;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 8px 12px;
    font-size: 14px;
`;


const BoardMembersModal = ({visible, onCloseModal}) => {
    const dispatch = useDispatch();
    const board = useSelector(state => state.board.board);
    const boardMembers = useSelector(state => state.board.boardMembers);
    const [email, onChangeEmail, setEmail] = useInput('');

    const getMembers = async () => {
        if (visible === false) return;
        
        const token = sessionStorage.getItem('token');
        dispatch(getBoardMembers({token, board_id: board.board_id}));
    }
    useEffect(() => {
        getMembers();
    }, [visible]);

    const onAddMember = async () => {
        if (email === '') return;
        const token = sessionStorage.getItem('token');
        const data = { email };
        const result = await dispatch(addBoardMember({token, board_id: board.board_id, data}));

        if (result.success) {
            getMembers();
        } else {
            console.log('add member fail')
        }
    };

    const onMemberDeleteClick = async (memberId) => {
        const token = sessionStorage.getItem('token');
        const result = await dispatch(deleteBoardMember({token, board_id: board.board_id, member_id: memberId}));

        if (result.success) {
            getMembers();
        } else {
            console.log('delete member fail')
        }
    }
    

    useEffect(() => {
        setEmail('');
    }, [setEmail])

    return (
        <MembersModal visible={visible} onCloseModal={onCloseModal}>
            <AddMemberContainer>
                <TitleWrapper>Invite member</TitleWrapper>
                <EmailInput value={email} onChange={onChangeEmail} placeholder='input member email' /> &nbsp;
                <Button type='primary' onClick={onAddMember}>Add</Button> &nbsp;
            </AddMemberContainer>
            <MemberListContainer>
                <TitleWrapper>Members</TitleWrapper>
                {
                    boardMembers &&
                    boardMembers.map(member => 
                        <MemberItem member={member} onDeleteClick={onMemberDeleteClick} key={member.member_id}/>)
                }
            </MemberListContainer>
        </MembersModal>
    )

};

export default React.memo(BoardMembersModal);


const MemberItemContainer = styled.div`
    height: 32px;
    line-height: 32px;
    padding-left: 8px;
    margin-bottom: 8px;
`;

const MemberDeleteButton = styled(Button)`
    float: right;
    height: 28px;
`;

const CustomIcon = styled(FontAwesomeIcon)`
    font-size: 16px;
    margin-right: 16px;
`;

const MemberItem = React.memo(({member, onDeleteClick}) => {
    return (
        <MemberItemContainer>
            <CustomIcon icon={faUser} size='xs'/>
            {member.email}
            <MemberDeleteButton onClick={() => onDeleteClick(member.member_id)}>
                { member.member_id === Number(sessionStorage.getItem('memberId')) ? 'Leave' : 'Delete'}
            </MemberDeleteButton>
        </MemberItemContainer>
    );
});
