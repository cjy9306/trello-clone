import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import Button from './Button';

const MemberItemContainer = styled.div`
	height: 32px;
	line-height: 32px;
	padding-left: 8px;
	margin-bottom: 8px;
	text-overflow: ellipsis;
`;

const DeleteButton = styled(Button)`
	float: right;
	height: 28px;
	margin-left: 16px;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 16px;
	margin-right: 16px;
`;

const EmailSpan = styled.span`
	@media only screen and (max-width: 500px) {
		display: none;
	}
`;

/*
 *	member list 출력에 사용되는 공통 컴포넌트
 *
 *	@className - Styled-components를 상속을 위한 prop
 *	@member - member object. 스토어에 저장된 member객
 *	@onDeleteClick - 삭제 버튼 클릭시 이벤트 함수
 */
const MemberListItem = ({ className, member, onDeleteClick }) => {
	return (
		<MemberItemContainer className={className}>
			<CustomIcon icon={faUser} size="xs" />
			{member.name}
			<EmailSpan>({member.email})</EmailSpan>
			<DeleteButton onClick={() => onDeleteClick(member.member_id)}>
				{member.member_id === Number(sessionStorage.getItem('memberId')) ? 'Leave' : 'Delete'}
			</DeleteButton>
		</MemberItemContainer>
	);
};

MemberListItem.propTypes = {
	className: PropTypes.string,
	member: PropTypes.object.isRequired,
	onDeleteClick: PropTypes.func,
};

export default React.memo(MemberListItem);
