import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

const PopupOver = styled.div`
	display: ${(props) => (props.visible ? 'block' : 'none')};
	position: absolute;
	box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	z-index: 10;
	background-color: #fff;
	width: 250px;
	margin-top: 8px;
	color: black;
	border-radius: 30px;
`;

const CloseSpan = styled.span`
	position: absolute;
	color: #aaaaaa;
	right: 0;
	font-size: 20px;
	font-weight: bold;
	margin-right: 8px;
	&:hover,
	&:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
`;

const CreateActionHeader = styled.div`
	background-color: #fff;
	padding: 12px 16px 0 16px;
	text-align: center;
	line-height: 16px;
`;

const CreateActionList = styled.div`
	background-color: #fff;
`;

const CreateActionListItem = styled.div`
	padding: 8px 8px 8px 8px;
	cursor: pointer;
	&:hover {
		background-color: rgba(9, 30, 66, 0.17);
	}
`;

const CustomIcon = styled(FontAwesomeIcon)`
	margin: 0 16px 0 8px;
`;

const TeamIcon = styled(CustomIcon)`
	font-size: 12px;
`;

const BoardIcon = styled(CustomIcon)`
	font-size: 16px;
`;

/*
 *	global header에서 + 버튼 액션이 발생하면 나오는 ui 컴포넌트. create board와 create team 액션이 있음
 *
 *	@visible - 해당 ui의 출력 여부 설정. true or false로 설정
 *	@onCloseAction - 해당 컴포넌트를 ui에서 제거하는 이벤트 함수
 *	@onShowBoardModal - CreateBoardModal을 ui에 출력하는 함수
 *	@onShowTeamModal - CreateTeamModal ui에 출력하는 함수
 */
const GlobalCreateAction = ({ visible, onCloseAction, onShowBoardModal, onShowTeamModal }) => {
	const onCreateTeamClick = useCallback(() => {
		onCloseAction();
		onShowTeamModal();
	}, [onCloseAction, onShowTeamModal]);

	const onCreateBoardClick = useCallback(() => {
		onCloseAction();
		onShowBoardModal();
	}, [onCloseAction, onShowBoardModal]);

	return (
		<PopupOver visible={visible}>
			<CreateActionHeader>
				Create
				<CloseSpan onClick={onCloseAction}>&times;</CloseSpan>
				<hr />
			</CreateActionHeader>
			<CreateActionList>
				<CreateActionListItem onClick={onCreateTeamClick}>
					<TeamIcon icon={faUserFriends} size="xs" />
					Create team
				</CreateActionListItem>
				<CreateActionListItem onClick={onCreateBoardClick}>
					<BoardIcon icon={faTrello} size="xs" />
					Create another board
				</CreateActionListItem>
			</CreateActionList>
		</PopupOver>
	);
};

GlobalCreateAction.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCloseAction: PropTypes.func.isRequired,
	onShowBoardModal: PropTypes.func.isRequired,
	onShowTeamModal: PropTypes.func.isRequired,
};

export default React.memo(GlobalCreateAction);
