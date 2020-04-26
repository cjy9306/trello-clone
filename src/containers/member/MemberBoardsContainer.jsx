import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_HEADER_DEFAULT_BACKGROUND } from '../../common/Constants';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import Message from '../../components/Message';
import GlobalHeader from '../../components/GlobalHeader';
import CreateBoardModal from '../../components/CreateBoardModal';
import { getAllBoards } from '../../modules/member';
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
	const message = useSelector((state) => state.common.message);
	const [boardModalVisible, setBoardModalVisible] = useState(false);

	const onToggleBoardModal = useCallback(() => setBoardModalVisible((visible) => !visible), []);

	const getBoards = useCallback(async () => {
		const memberId = sessionStorage.getItem('memberId');
		dispatch(getAllBoards({ memberId }));
	}, [dispatch]);

	useEffect(() => {
		getBoards();
	}, [getBoards]);

	return (
		<>
			<GlobalHeader isLogined={isLogined} backgroundColor={GLOBAL_HEADER_DEFAULT_BACKGROUND} />
			<CreateBoardModal visible={boardModalVisible} onCloseModal={onToggleBoardModal} />
			<BoardsContainer>
				<PersonalBoards onToggleBoardModal={onToggleBoardModal} />
				<TeamBoards onToggleBoardModal={onToggleBoardModal} />
			</BoardsContainer>
			<Message visible={message.visible} type={message.type} text={message.text} />
		</>
	);
};

export default React.memo(MemberBoardsContainer);
