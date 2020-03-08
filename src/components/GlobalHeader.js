import React, { useState } from 'react';
import styled from 'styled-components/macro';
import HeaderButton from './HeaderButton';
import { useHistory } from 'react-router-dom';
import CreateBoardModal from './CreateBoardModal';
import CreateTeamModal from './CreateTeamModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import GlobalCreateAction from './GlobalCreateAction';

const HeaderContainer = styled.div`
	height: 32px;
	padding: 8px 16px 8px 16px;
	background-color: ${props => (props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,.15)')};
	display: flex;
	justify-content: space-between;
	color: white;
`;

const TitleWrapper = styled.div`
	width: 33.3%;
	text-align: center;
	line-height: 32px;
`;

const MenuWrapper = styled.div`
	width: 33.3%;
	line-height: 32px;
	text-align: ${props => props.textAlign};
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 16px;
`;

const GlobalHeader = ({ isLogined, backgroundColor }) => {
	const history = useHistory();
	const [boardModalVisible, setBoardModalVisible] = useState(false);
	const [teamModalVisible, setTeamModalVisible] = useState(false);
	const [createActionVisible, setCreateActionVisible] = useState(false);

	const onClickHome = () => {
		const username = sessionStorage.getItem('username');
		history.push('/member/' + username + '/boards');
	};

	const onClickLogOut = () => {
		sessionStorage.setItem('token', null);
		sessionStorage.setItem('memberId', null);
		sessionStorage.setItem('username', null);

		history.push('/');
	};

	// create board modal
	const onCloseBoardModal = () => setBoardModalVisible(false);
	const onShowBoardModal = () => setBoardModalVisible(true);

	// create team modal
	const onCloseTeamModal = () => setTeamModalVisible(false);
	const onShowTeamModal = () => setTeamModalVisible(true);

	// create action
	const onToggleCreateAction = () => setCreateActionVisible(!createActionVisible);

	return (
		<HeaderContainer backgroundColor={backgroundColor}>
			<CreateBoardModal visible={boardModalVisible} onCloseModal={onCloseBoardModal} />
			<CreateTeamModal visible={teamModalVisible} onCloseModal={onCloseTeamModal} />
			<MenuWrapper textAlign="left">
				<HeaderButton onClick={onClickHome}>
					<CustomIcon icon={faHome} size="xs" />
				</HeaderButton>
				&nbsp;
				<HeaderButton onClick={onToggleCreateAction}>
					<CustomIcon icon={faPlus} size="xs" />
				</HeaderButton>
				<GlobalCreateAction
					visible={createActionVisible}
					onTogglePopup={onToggleCreateAction}
					onShowBoardModal={onShowBoardModal}
					onShowTeamModal={onShowTeamModal}
				/>
			</MenuWrapper>
			<TitleWrapper>Trello Clone</TitleWrapper>
			<MenuWrapper textAlign="right">
				{isLogined ? (
					<HeaderButton type="default" onClick={onClickLogOut}>
						Log out
					</HeaderButton>
				) : (
					<HeaderButton>Login</HeaderButton>
				)}
			</MenuWrapper>
		</HeaderContainer>
	);
};

export default React.memo(GlobalHeader);
