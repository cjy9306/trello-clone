import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllLabels, updateCardLabel, getBoard, getCard } from '../../../../modules/board';
import SideBarLabelsItem from './SideBarLabelsItem';

const SideBarLabelsContainer = styled.div`
	background-color: #fff;
`;

const SideBarLabelsHeader = styled.div`
	height: 32px;
	line-height: 32px;
	padding: 8px 16px 0 16px;
	text-align: center;
`;

const SideBarLabelsContent = styled.div`
	padding: 20px 16px 16px 16px;
`;

const CloseSpan = styled.span`
	color: #aaaaaa;
	font-size: 20px;
	font-weight: bold;
	margin-right: 8px;
	position: absolute;
	right: 0px;
	&:hover,
	&:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
`;

const LabelsTitle = styled.div`
	font-size: 14px;
	margin-bottom: 8px;
`;

const isInCardLabels = (label, cardLabels) => {
	if (typeof cardLabels !== 'object') return false;

	for (let i = 0; i < cardLabels.length; i++) {
		if (label.label_id === cardLabels[i].label_id) {
			return true;
		}
	}

	return false;
};

const SideBarLabels = ({ onPopupToggle, card }) => {
	const allLabels = useSelector((state) => state.board.allLabels);
	const board = useSelector((state) => state.board.board);
	const dispatch = useDispatch();

	const onLabelsItemClick = useCallback(
		async (labelId, checked) => {
			const data = {
				checked,
			};

			const result = await dispatch(updateCardLabel({ boardId: board.board_id, cardId: card.card_id, labelId, data }));

			if (result.success) {
				dispatch(getBoard({ boardId: board.board_id }));
				dispatch(getCard({ boardId: board.board_id, cardId: card.card_id }));
			}
		},
		[dispatch, board, card]
	);

	const getLabels = useCallback(async () => {
		dispatch(getAllLabels({ boardId: board.board_id }));
	}, [board, dispatch]);

	useEffect(() => {
		getLabels();
	}, [getLabels]);

	return (
		<SideBarLabelsContainer>
			<SideBarLabelsHeader>
				Lables
				<CloseSpan onClick={onPopupToggle}>&times;</CloseSpan>
				<hr />
			</SideBarLabelsHeader>
			<SideBarLabelsContent>
				<LabelsTitle>LABELS</LabelsTitle>
				{allLabels &&
					card &&
					allLabels.map((label) => (
						<SideBarLabelsItem
							label={label}
							defaultChecked={isInCardLabels(label, card.labels)}
							onLabelsItemClick={onLabelsItemClick}
							key={label.label_id}
						/>
					))}
			</SideBarLabelsContent>
		</SideBarLabelsContainer>
	);
};

SideBarLabels.propTypes = {
	onPopupToggle: PropTypes.func.isRequired,
	card: PropTypes.object.isRequired,
};

export default React.memo(SideBarLabels);
