import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardModalHeader from './CardModalHeader';
import Modal from '../../../components/Modal';
import Detail from './Detail/Detail';
import CheckList from './CheckList/CheckList';
import Comment from './Comment/Comment';
import SideBar from './SideBar/SideBar';
import Description from './Description/Description';

const CardModalContainer = styled(Modal)`
	min-height: 400px;
	overflow-x: hidden;
	overflow-y: auto;

	@media only screen and (min-width: 769px) {
		width: 768px;
	}

	// phone
	@media only screen and (min-width: 481px) and (max-width: 768px) {
		width: 90%;
	}

	// low resolution phone
	@media only screen and (max-width: 480px) {
		width: 95%;
	}
`;

const ContentContainer = styled.div`
	float: left;
	padding: 0px 8px 8px 16px;

	// desktop, tablet
	@media only screen and (min-width: 769px) {
		width: 542px;
	}

	// phone
	@media only screen and (min-width: 668px) and (max-width: 768px) {
		width: 380px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		width: 95%;
		margin-right: 8px;
		padding-left: 8px;
	}
`;

/*
 *	카드 상세보기 Modal 컴포넌트
 *
 */
const CardModal = ({ visible, onCloseModal }) => {
	const card = useSelector((state) => state.board.card);

	return (
		<CardModalContainer visible={visible} onCloseModal={onCloseModal}>
			<CardModalHeader card={card} />
			<ContentContainer>
				<Detail card={card} />
				<Description card={card} />
				<CheckList card={card} />
				<Comment card={card} />
			</ContentContainer>
			<SideBar card={card} />
		</CardModalContainer>
	);
};

CardModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

export default React.memo(CardModal);
