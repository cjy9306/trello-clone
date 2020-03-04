import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import SideBarLabelsItem from './SideBarLabelsItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLabels, updateCardLabel, getBoard, getCard } from '../../../modules/board';

const SideBarLabelsContainer = styled.div`
	background-color: #fff;
`;

const SideBarLabelsHeader = styled.div`
	text-align: center;
	line-height: 32px;
	height: 32px;
	padding: 8px 16px 0 16px;
`;

const SideBarLabelsContent = styled.div`
	padding: 20px 16px 16px 16px;
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
	const allLabels = useSelector(state => state.board.allLabels);
	const board = useSelector(state => state.board.board);
	const dispatch = useDispatch();

	const onLabelsItemClick = async (label_id, checked) => {
		const data = {
			checked
		};

		const result = await dispatch(updateCardLabel({ boardId: board.board_id, card_id: card.card_id, label_id, data }));

		if (result.success) {
			await dispatch(getBoard({ boardId: board.board_id }));
			await dispatch(getCard({ boardId: board.board_id, card_id: card.card_id }));
		} else {
		}
	};

	useEffect(() => {
		dispatch(getAllLabels({ boardId: board.board_id }));
	}, [board, dispatch]);

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
					allLabels.map(label => (
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

export default React.memo(SideBarLabels);
