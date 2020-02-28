import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Button from './Button';

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

const MemberListItem = React.memo(({className, member, onDeleteClick}) => {
    return (
        <MemberItemContainer className={className}>
            <CustomIcon icon={faUser} size='xs'/>
            {member.email}
            <MemberDeleteButton onClick={() => onDeleteClick(member.member_id)}>
                { member.member_id === Number(sessionStorage.getItem('memberId')) ? 'Leave' : 'Delete'}
            </MemberDeleteButton>
        </MemberItemContainer>
    );
});

export default React.memo(MemberListItem);
