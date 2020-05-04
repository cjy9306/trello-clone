import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { createBoard } from '../modules/board';
import { getTeams } from '../modules/member';
import DropDown from './DropDown';
import Button from './Button';
import Modal from './Modal';
import { BoardColorArray } from '../common/Constants';

const CreateModal = styled(Modal)`
	max-width: 420px;
	height: 160px;
	border-radius: 3px;
`;

const CreateBoardContainer = styled.div`
	border-radius: 3px;
	display: flex;
	justify-content: space-between;
	margin: 16px 0 0 16px;
`;

const CreateBoardControl = styled.div`
	display: flex;
	margin: 0 0 0 16px;
`;

const CreateBoardContent = styled.div`
	padding: 8px 16px 16px 0;
	max-width: 230px;
`;

const TitleInput = styled.input`
	margin: 0 0 12px 0;
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

const ColorContent = styled.div`
	width: 110px;
	display: flex;
	margin: 0 16px 16px 0;
	flex-wrap: wrap;
	justify-content: space-between;
`;

/*
 *	board 생성을 위한 modal. modal 컴포넌트 css 상속
 *	global header에 쓰임
 *
 *	@visible - 해당 modal을 ui에 출력하는 flag. true or false 로 설정
 *	@onCloseModal - 해당 modal을 ui에서 제거하는 함수
 */
const CreateBoardModal = ({ visible, onCloseModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [title, onChangeTitle, setTitle] = useInput('');
	const [colorArray, setColorArray] = useState(BoardColorArray);
	const [dropdownTeams, setDropdownTeams] = useState([]);
	const [teamId, setTeamId] = useState(0);
	const teams = useSelector((state) => state.member.teams);

	const getCheckdColor = () => {
		let backgroundColor = '';
		// some은 return true일 경우 loop가 break가 됨
		colorArray.some((color) => {
			if (color[2] === true) {
				backgroundColor = color[1];
				return true;
			}

			return false;
		});

		return backgroundColor;
	};

	const onCreateBoard = async () => {
		const memberId = sessionStorage.getItem('memberId');
		const backgroundColor = getCheckdColor();
		const data = {
			boardName: title,
			publicScope: 'private',
			memberId: memberId,
			teamId: teamId === 0 ? null : teamId,
			backgroundColor,
		};

		const result = await dispatch(createBoard({ data }));

		if (result.success) {
			history.push('/board/' + result.data.data.board.board_id);
		}
	};

	const onColorBlockClick = (id) => {
		const newArray = [...colorArray];
		newArray.forEach((item, index) => {
			if (item[0] === id) newArray[index][2] = true;
			else newArray[index][2] = false;
		});

		setColorArray(newArray);
	};

	const onTeamSelected = (team) => setTeamId(team.id);

	useEffect(() => {
		const memberId = sessionStorage.getItem('memberId');

		dispatch(getTeams({ memberId }));
	}, [dispatch]);

	useEffect(() => {
		let datas = [];
		if (teams && Array.isArray(teams)) {
			datas = teams.map((team) => ({ id: team.team_id, value: team.team_name }));
		}

		datas.unshift({ id: 0, value: 'No Team' });
		setDropdownTeams(datas);
	}, [teams]);

	useEffect(() => {
		setTitle('');
	}, [setTitle]);

	return (
		<CreateModal visible={visible} onCloseModal={onCloseModal}>
			<CreateBoardContainer>
				<CreateBoardContent>
					<TitleInput value={title} onChange={onChangeTitle} placeholder="Add board title" />
					<DropDown data={dropdownTeams} onSelected={onTeamSelected} />
				</CreateBoardContent>
				<ColorContent>
					{colorArray.map((item, index) => (
						<ColorBlock data={item} onColorBlockClick={onColorBlockClick} key={item[0]} />
					))}
				</ColorContent>
			</CreateBoardContainer>
			<CreateBoardControl>
				<Button type="primary" onClick={onCreateBoard}>
					Create
				</Button>
				&nbsp;
				<Button type="default" onClick={onCloseModal}>
					Cancel
				</Button>
			</CreateBoardControl>
		</CreateModal>
	);
};

CreateBoardModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

export default React.memo(CreateBoardModal);

const ColorBlockContainer = styled.div`
	width: 32px;
	height: 32px;
	background-color: #${(props) => props.backgroundColor};
	border-radius: 4px;
	margin-top: 8px;
	cursor: pointer;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 12px;
	color: white;
	right: 0;
	top: 0;
	padding: 10px;
	display: ${(props) => (props.checked ? 'inline-block' : 'none')};
`;

/*
 *	위의 board modal에서 사용되는 컴포넌트.
 *	board의 색상을 설정하는 ui의 color block을 나타냄
 *
 *	@data - common/Constants.js에 BoardColorArray를 사용한 데이터. 배열 형태로 되어있음.
 *	@onColorBlockClick - 해당 color block이 클릭했을 때의 이벤트
 */
const ColorBlock = ({ data, onColorBlockClick }) => {
	const colorId = data[0];
	const backgroundColor = data[1];
	const checked = data[2];

	const onBlockClick = () => {
		if (checked === true) return;

		onColorBlockClick(colorId);
	};

	return (
		<ColorBlockContainer backgroundColor={backgroundColor} onClick={onBlockClick}>
			<CustomIcon icon={faCheck} checked={checked} size="xs" />
		</ColorBlockContainer>
	);
};

ColorBlock.propTypes = {
	data: PropTypes.array.isRequired,
	onColorBlockClick: PropTypes.func.isRequired,
};
