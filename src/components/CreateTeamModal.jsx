import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { createTeam } from '../modules/team';
import Button from './Button';
import Modal from './Modal';

const CreateModal = styled(Modal)`
	max-width: 380px;
	height: 300px;
	border-radius: 3px;
`;

const CreateTeamContent = styled.div`
	padding: 24px 32px 8px 32px;
	width: 100%;
	box-sizing: border-box;
`;

const CreateTeamControl = styled.div`
	padding: 0 32px 0 32px;
	width: 100%;
	box-sizing: border-box;
`;

const TeamNameInput = styled.input`
	margin: 12px 0 12px 0;
	height: 30px;
	width: 100%;
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 8px 12px;
	font-size: 14px;
`;

const TeamDescTextArea = styled.textarea`
	margin: 12px 0 12px 0;
	height: 80px;
	width: 100%;
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 8px 12px;
	font-size: 14px;
	resize: none;
`;

/*
 *	team 생성에 사용되는 modal. global header에서 사용
 *
 *	@visible - 해당 컴포넌트의 ui 출력 설정. true or false로 설정
 *	@onCloseModal - 해당 컴포넌트를 ui에서 제거하는 함수
 */
const CreateTeamModal = ({ visible, onCloseModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [teamName, onChangeTeamName, setTeamName] = useInput('');
	const [description, onChangeDescription, setDescription] = useInput('');

	const onCreateTeam = async () => {
		const memberId = sessionStorage.getItem('memberId');
		const data = {
			teamName,
			description,
			memberId,
		};

		const result = await dispatch(createTeam({ data }));

		if (result.success) {
			onCloseModal();
			history.push('/team/' + result.data.data.team.team_id + '/settings');
		}
	};

	useEffect(() => {
		setTeamName('');
		setDescription('');
	}, [setTeamName, setDescription]);

	return (
		<CreateModal visible={visible} onCloseModal={onCloseModal}>
			<CreateTeamContent>
				Team name
				<TeamNameInput value={teamName} onChange={onChangeTeamName} placeholder="Add team name" />
				Team Description
				<TeamDescTextArea value={description} onChange={onChangeDescription} placeholder="Add team description" />
			</CreateTeamContent>
			<CreateTeamControl>
				<Button type="primary" onClick={onCreateTeam}>
					Create
				</Button>
				&nbsp;
				<Button type="default" onClick={onCloseModal}>
					Cancel
				</Button>
			</CreateTeamControl>
		</CreateModal>
	);
};

CreateTeamModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

export default React.memo(CreateTeamModal);
