import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { ConfirmModal } from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateTeam, deleteTeam } from '../../modules/team';
import { setMessageStates } from '../../modules/common';
import useInput from '../../hooks/useInput';
import Button from '../../components/Button';

const SettingsHeader = styled.div`
	background-color: #f4f5f7;
`;

const TeamInfoContent = styled.div`
	max-width: 768px;
	margin: 0 auto;
	padding: 48px 32px 24px 32px;
`;

const TeamInfoTitle = styled.div`
	font-size: 32px;
	padding-left: 12px;
	margin-bottom: 28px;
`;

const TeamInfoDescription = styled.div`
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

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 32px;
	margin-right: 16px;
`;

const TeamInfo = ({ teamId }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [confirmModalVisible, setConfirmModalVisible] = useState(false);
	const [isEditting, setIsEditting] = useState(false);
	const [description, onChangeDescription, setDescription] = useInput('');
	const team = useSelector(state => state.team.team);
	const editRef = useRef();

	const onTeamDeleteOk = async () => {
		const result = await dispatch(deleteTeam({ teamId }));

		if (result.success) {
			const memberId = sessionStorage.getItem('memberId');
			history.push('/member/' + memberId + '/boards');
		} else {
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	const onSaveDescription = async () => {
		if (description === team.description) return;

		const data = { team_name: team.team_name, description };
		const result = await dispatch(updateTeam({ teamId, data }));

		if (result.success) {
			setIsEditting(false);
		} else {
			setDescription(team.description);
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	const onLabelClick = () => setIsEditting(true);
	const onCancelClick = () => setIsEditting(false);

	const onShowTeamDeletMoal = () => setConfirmModalVisible(true);
	const onCloseTeamDeleteModal = () => setConfirmModalVisible(false);

	useEffect(() => {
		if (isEditting) editRef.current.focus();
	}, [isEditting]);

	return (
		<SettingsHeader>
			<TeamInfoContent>
				<TeamInfoTitle>
					<CustomIcon icon={faUserFriends} size="xs" />
					{team && team.team_name}
				</TeamInfoTitle>
				<TeamInfoDescription>
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
				</TeamInfoDescription>
				<ConfirmModal
					visible={confirmModalVisible}
					message="Are you sure delete this team?"
					onCloseModal={onCloseTeamDeleteModal}
					onClickOk={onTeamDeleteOk}
				/>
				<Button type="danger" onClick={onShowTeamDeletMoal}>
					Delete this team
				</Button>
			</TeamInfoContent>
		</SettingsHeader>
	);
};

export default React.memo(TeamInfo);
