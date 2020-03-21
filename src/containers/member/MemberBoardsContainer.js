import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import GlobalHeader from '../../components/GlobalHeader';
import CreateBoardModal from '../../components/CreateBoardModal';
import { getAllBoards } from '../../modules/member';
import { setMessageStates } from '../../modules/common';
import PersonalBoards from './BoardList/PersonalBoards';
import TeamBoards from './BoardList/TeamBoards';

const BoardsContainer = styled.div`
	max-width: 860px;
	margin: 20px auto;

	@media only screen and (max-width: 768px) {
		margin: 20px 12px;
	}
`;

const MemberBoardsContainer = () => {
	const isLogined = useCheckWhetherIsLogined();
	const dispatch = useDispatch();

	const [boardModalVisible, setBoardModalVisible] = useState(false);

	const onToggleBoardModal = useCallback(() => setBoardModalVisible(visible => !visible), []);

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
			<CreateBoardModal visible={boardModalVisible} onCloseModal={onToggleBoardModal} />
			<BoardsContainer>
				<PersonalBoards onToggleBoardModal={onToggleBoardModal} />
				<TeamBoards onToggleBoardModal={onToggleBoardModal} />
			</BoardsContainer>
		</>
	);
};

export default React.memo(MemberBoardsContainer);
