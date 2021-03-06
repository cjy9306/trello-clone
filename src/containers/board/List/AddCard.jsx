import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';

const AddCardContainer = styled.div`
	color: #5e6c84;
`;

const LabelWrapper = styled.div`
	display: ${(props) => (props.isAdding ? 'none' : 'block')};
	margin: 0px 8px 8px 8px;
	padding: 8px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.15);
		cursor: pointer;
	}
`;

const InputContainer = styled.div`
	border: 1px lightgrey;
	border-radius: 3px;
	display: ${(props) => (props.isAdding ? 'block' : 'none')};
	margin: 0 8px 8px 8px;
`;

const EditWrapper = styled.div`
	background-color: white;
	border: 1px lightgrey;
	border-radius: 3px;
	box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
	padding: 4px;
`;

const EditField = styled.textarea`
	border: none;
	background: none;
	box-shadow: none;
	font-size: 16px;
	min-height: 54px;
	max-height: 162px;
	overflow: hidden;
	overflow-wrap: break-word;
	resize: none;
	width: 100%;
`;

const ControlWrapper = styled.div`
	margin-top: 8px;
`;

/*
 *	card를 추가할 때 사용하는 컴포넌트
 *
 */
const AddCard = ({ onCreateCard }) => {
	const [isAdding, setIsAdding] = useState(false);
	const [newCardName, onChangeCardName, setNewCardName] = useInput('');

	const toggleAdding = useCallback(() => {
		setIsAdding(!isAdding);
		if (isAdding === false) {
			setNewCardName('');
		}
	}, [setIsAdding, setNewCardName, isAdding]);

	const handleCardAdd = useCallback(async () => {
		if (newCardName === '') return;

		onCreateCard(newCardName);
		setNewCardName('');
	}, [newCardName, onCreateCard, setNewCardName]);

	return (
		<AddCardContainer>
			<LabelWrapper isAdding={isAdding} onClick={toggleAdding}>
				+ Add a card
			</LabelWrapper>
			<InputContainer isAdding={isAdding}>
				<EditWrapper>
					<EditField
						type="textarea"
						name="input"
						value={newCardName}
						placeholder="Enter a title for this card..."
						onChange={onChangeCardName}
					/>
				</EditWrapper>
				<ControlWrapper>
					<Button type="primary" onClick={handleCardAdd}>
						Add Card
					</Button>
					&nbsp;
					<Button type="default" onClick={toggleAdding}>
						Cancel
					</Button>
				</ControlWrapper>
			</InputContainer>
		</AddCardContainer>
	);
};

AddCard.propTypes = {
	onCreateCard: PropTypes.func.isRequired,
};

export default React.memo(AddCard);
