import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import Button from '../../components/Button';
import { updateTeam } from '../../modules/team';
import { setMessageStates } from '../../modules/common';

const TeamInfoContainer = styled.div`
	margin-bottom: 28px;
`;

const LabelWrapper = styled.div`
	background-color: rgba(9, 30, 66, 0.04);
	box-shadow: none;
	border: none;
	border-radius: 3px;
	display: ${props => (props.isEditting ? 'none' : 'block')};
	min-height: 40px;
	padding: 8px 12px;
	text-decoration: none;
	font-size: 14px;
	cursor: pointer;
	&:hover {
		background-color: rgba(9, 30, 66, 0.09);
	}
`;

const TextAreaWrapper = styled.div`
	display: ${props => (props.isEditting ? 'block' : 'none')};
	width: 100%;
`;

const TextAreaField = styled.textarea`
	width: 100%;
	border: none;
	overflow: hidden;
	overflow-wrap: break-word;
	resize: none;
	height: 108px;
	min-height: 108px;
	background: #fff;
	box-shadow: none;
	padding: 8px 12px;
	box-sizing: border-box;
	border-radius: 3px;
	font-size: 14px;
`;

const ControlWrapper = styled.div``;

const TeamInfoDescription = ({ team }) => {
	const dispatch = useDispatch();
	const editRef = useRef();

	const [isEditting, setIsEditting] = useState(false);
	const [description, onChangeDescription, setDescription] = useInput('');

	const onSaveDescription = async () => {
		if (description === team.description) return;

		const data = { team_name: team.team_name, description };
		const result = await dispatch(updateTeam({ teamId: team.teamId, data }));

		if (result.success) {
			setIsEditting(false);
		} else {
			setDescription(team.description);
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	const onLabelClick = () => setIsEditting(true);
	const onCancelClick = () => setIsEditting(false);

	useEffect(() => {
		if (isEditting) editRef.current.focus();
	}, [isEditting]);

	return (
		<TeamInfoContainer>
			<LabelWrapper isEditting={isEditting} onClick={onLabelClick}>
				{description === '' || description == null
					? 'Add a more detailed description...'
					: description &&
					  description.split('\n').map((line, index) => (
							<span key={index}>
								{line}
								<br />
							</span>
					  ))}
			</LabelWrapper>
			<TextAreaWrapper isEditting={isEditting}>
				<TextAreaField
					value={description}
					placeholder={description == null || description === '' ? 'Add a more detailed description...' : ''}
					ref={editRef}
					onChange={onChangeDescription}
				/>
				<ControlWrapper>
					<Button type="primary" onClick={onSaveDescription}>
						Save
					</Button>{' '}
					&nbsp;
					<Button type="default" onClick={onCancelClick}>
						Cancel
					</Button>
				</ControlWrapper>
			</TextAreaWrapper>
		</TeamInfoContainer>
	);
};

export default React.memo(TeamInfoDescription);
