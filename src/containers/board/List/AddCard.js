import React, { useState } from 'react';
import styled from 'styled-components/macro';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';

const Container = styled.div`
	color: #5e6c84;
`;

const LabelWrapper = styled.div`
	display: ${props => (props.isAdding ? 'none' : 'block')};
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
	display: ${props => (props.isAdding ? 'block' : 'none')};
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

const AddCard = ({ onCreateCard }) => {
	const [isAdding, setIsAdding] = useState(false);
	const [newCardName, onChangeCardName, setNewCardName] = useInput('');

	const onToggle = () => {
		setIsAdding(!isAdding);
		if (isAdding === false) {
			setNewCardName('');
		}
	};

	const onAddClick = async () => {
		if (newCardName === '') return;

		const result = await onCreateCard(newCardName);
		if (result) setNewCardName('');
	};

	return (
		<Container>
			<LabelWrapper isAdding={isAdding} onClick={onToggle}>
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
					<Button type="primary" onClick={onAddClick}>
						Add Card
					</Button>
					&nbsp;
					<Button type="default" onClick={onToggle}>
						Cancel
					</Button>
				</ControlWrapper>
			</InputContainer>
		</Container>
	);
};

export default React.memo(AddCard);
