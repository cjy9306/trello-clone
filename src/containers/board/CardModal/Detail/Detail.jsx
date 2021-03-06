import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from '../../../../components/Tag';
import Alert from '../../../../components/Alert';
import { updateCard, getCard } from '../../../../modules/board';
import { checkOverDueDate } from '../../../../common/CommonUtils';

const DetailContainer = styled.div`
	display: ${(props) => props.visible};

	@media only screen and (min-width: 669px) {
		margin: 8px 0 24px 40px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		margin: 8px 0 24px 8px;
	}
`;

const LabelsContainer = styled.div`
	margin-bottom: 20px;
	overflow: auto;
	position: relative;
	display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const LabelWrapper = styled.span`
	border-radius: 4px;
	float: left;
	margin: 0 4px 4px 0;
	min-width: 20px;
	min-height: 8px;
	width: auto;
`;

const DueDateContainer = styled.div`
	font-size: 14px;
	margin-bottom: 20px;
`;

const CustomPicker = styled(DatePicker)`
	border-radius: 3px;
	font-size: 16px;
	height: 32px;
	margin-top: 8px;
	padding: 4px 8px 4px 8px;
`;

/*
 *	Card의 Details 정보 컴포넌트. 아직은 Label과 DueDate 정보만 잇음
 *
 */
const Detail = ({ card }) => {
	const [dueDate, setDueDate] = useState('');
	const [overdueVisible, setOverdueVisible] = useState(false);

	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);

	const handleDueDateChange = useCallback(
		async (selected) => {
			const data = { ...card, dueDate: selected };

			const result = await dispatch(updateCard({ boardId: board.board_id, cardId: card.card_id, data }));

			if (result.success === true) dispatch(getCard({ boardId: board.board_id, cardId: card.card_id }));
		},
		[dispatch, board, card]
	);

	useEffect(() => {
		if (card.due_date) {
			setDueDate(new Date(card.due_date));

			if (checkOverDueDate(card.due_date)) setOverdueVisible(true);
			else setOverdueVisible(false);
		} else {
			setDueDate(null);
			setOverdueVisible(false);
		}
	}, [card]);

	return (
		<DetailContainer>
			<LabelsContainer visible={!!card.labels}>
				{card.labels &&
					card.labels.map((label) => (
						<LabelWrapper color={label.color} key={label.label_id}>
							<Tag size="large" color={`${label.color}`}>
								{label.label_name}
							</Tag>
						</LabelWrapper>
					))}
			</LabelsContainer>
			<DueDateContainer>
				DUE DATE
				<br />
				<CustomPicker selected={dueDate} onChange={handleDueDateChange} />
				&nbsp;
				<Alert type="error" message="OVERDUE" visible={overdueVisible} />
			</DueDateContainer>
		</DetailContainer>
	);
};

Detail.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(Detail);
