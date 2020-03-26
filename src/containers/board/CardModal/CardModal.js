import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import DetailsContent from './Detail/DetailsContent';
import CheckListContent from './CheckList/CheckListContent';
import CommentContent from './Comment/CommentContent';
import SideBar from './SideBar/SideBar';
import Header from './Header';
import DescriptionContent from './Description/DescriptionContent';

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

const MainContent = styled.div`
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

const SideBarContent = styled.div`
	margin-top: 26px;
	float: right;
	padding: 0 8px 8px 0;
	overflow: hidden;

	// desktop, tablet, phone
	@media only screen and (min-width: 668px) {
		width: 188px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		width: 95%;
	}
`;

const CardModal = ({ visible, onCloseModal }) => {
	const card = useSelector(state => state.board.card);

	return (
		<CardModalContainer visible={visible} onCloseModal={onCloseModal}>
			<Header card={card} />
			<MainContent>
				<DetailsContent card={card} />
				<DescriptionContent card={card} />
				<CheckListContent card={card} />
				<CommentContent card={card} />
			</MainContent>
			<SideBarContent>
				<SideBar card={card} />
			</SideBarContent>
		</CardModalContainer>
	);
};

CardModal.propTypes = {
	vsible: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired
};

export default React.memo(CardModal);
