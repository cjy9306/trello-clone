import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import { getAllBoards } from '../../modules/member';
import { useDispatch } from 'react-redux';
import GlobalHeader from '../../components/GlobalHeader';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import CreateBoardModal from '../../components/CreateBoardModal';
import PersonalBoards from './PersonalBoards';
import MemberTeams from './MemberTeams';
import { setMessageStates } from '../../modules/common';

const BoardsContainer = styled.div`
	max-width: 860px;
	margin: 20px auto;
`;

const MemberBoardsContainer = () => {
	const isLogined = useCheckWhetherIsLogined();
	const dispatch = useDispatch();

	const [boardModalVisible, setBoardModalVisible] = useState(false);

	const onCloseBoardModal = () => setBoardModalVisible(false);
	const onShowBoardModal = () => setBoardModalVisible(true);

	const getBoards = useCallback(async () => {
		const member_id = sessionStorage.getItem('memberId');
		const result = await dispatch(getAllBoards({ member_id }));

		if (result.success === false) dispatch(setMessageStates(true, 'error', result.data.data));
	}, [dispatch]);

	useEffect(() => {
		getBoards();
	}, [getBoards]);

	return (
		<>
			<GlobalHeader isLogined={isLogined} backgroundColor={'#026aa7'} />
			<CreateBoardModal visible={boardModalVisible} onCloseModal={onCloseBoardModal} />
			<BoardsContainer>
				<PersonalBoards />
				<MemberTeams onShowBoardModal={onShowBoardModal} />
			</BoardsContainer>
		</>
	);
};

export default React.memo(MemberBoardsContainer);
