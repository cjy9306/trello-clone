import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import CreateBoardModal from './CreateBoardModal';
import CreateTeamModal from './CreateTeamModal';
import GlobalCreateAction from './GlobalCreateAction';
import HeaderButton from './HeaderButton';

const HeaderContainer = styled.div`
	height: 32px;
	padding: 8px 16px 8px 16px;
	background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,.15)')};
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
	text-align: ${(props) => props.textAlign};
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
	const onToggleBoardModal = useCallback(() => setBoardModalVisible((visible) => !visible), []);
	const onToggleTeamModal = useCallback(() => setTeamModalVisible((visible) => !visible), []);
	const onToggleCreateAction = useCallback(() => setCreateActionVisible((visible) => !visible), []);

	return (
		<HeaderContainer backgroundColor={backgroundColor}>
			<CreateBoardModal visible={boardModalVisible} onCloseModal={onToggleBoardModal} />
			<CreateTeamModal visible={teamModalVisible} onCloseModal={onToggleTeamModal} />
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
					onShowBoardModal={onToggleBoardModal}
					onShowTeamModal={onToggleTeamModal}
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

GlobalHeader.propTypes = {
	isLogined: PropTypes.bool.isRequired,
	backgroundColor: (props, propName, componentName) => {
		const propValue = props[propName];
		if (propValue === null || propValue === undefined) return;
		if (typeof propValue === 'string') return;
		return new Error(`${componentName} only accepts null or undefined or string`);
	},
};

export default React.memo(GlobalHeader);
