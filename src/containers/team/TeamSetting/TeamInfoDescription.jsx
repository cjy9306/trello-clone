import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ContentsWithLF from '../../../components/ContentsWithLF';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';
import { updateTeam } from '../../../modules/team';

const TeamInfoContainer = styled.div`
	margin-bottom: 28px;
`;

const LabelWrapper = styled.div`
	background-color: rgba(9, 30, 66, 0.04);
	box-shadow: none;
	border: none;
	border-radius: 3px;
	display: ${(props) => (props.isEditting ? 'none' : 'block')};
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
	display: ${(props) => (props.isEditting ? 'block' : 'none')};
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

/*
 *	Team의 Description 컴포넌트
 *
 */
const TeamInfoDescription = ({ team }) => {
	const dispatch = useDispatch();
	const editRef = useRef();

	const [isEditting, setIsEditting] = useState(false);
	const [description, onChangeDescription, setDescription] = useInput('');
	const onToggleDescription = useCallback(() => setIsEditting((isEditting) => !isEditting), []);

	const onSaveDescription = async () => {
		if (description === team.description) return;

		const data = { teamName: team.team_name, description };
		const result = await dispatch(updateTeam({ teamId: team.team_id, data }));

		if (result.success) {
			onToggleDescription();
		}
	};

	useEffect(() => {
		if (team.description !== undefined) setDescription(team.description);
	}, [team, setDescription]);

	useEffect(() => {
		if (isEditting) editRef.current.focus();
		else setDescription(team.description);
	}, [isEditting, setDescription]);

	return (
		<TeamInfoContainer>
			<LabelWrapper isEditting={isEditting} onClick={onToggleDescription}>
				{description === '' || description == null ? (
					'Add a more detailed description...'
				) : (
					<ContentsWithLF contents={description} />
				)}
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
					<Button type="default" onClick={onToggleDescription}>
						Cancel
					</Button>
				</ControlWrapper>
			</TextAreaWrapper>
		</TeamInfoContainer>
	);
};

TeamInfoDescription.propTypes = {
	team: PropTypes.object.isRequired,
};

export default React.memo(TeamInfoDescription);
