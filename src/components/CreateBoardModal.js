import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import useInput from './useInput';
import Button from './Button';
import Modal from './Modal';
import { createBoard } from '../modules/board';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../modules/member';


const CreateModal = styled(Modal)`
    width: 420px;
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
    width: 230px;
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

const ColarArray = [
    [0, '4BBF6B', true],
    [1, '00a5c3', false],
    [2, '006eb3', false],
    [3, 'ce8437', false],
    [4, '778186', false],
    [5, 'a93b2e', false],
]

const CreateBoardModal = ({visible, onCloseModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, onChangeTitle, setTitle] = useInput('');
    const [colorArray, setColorArray] = useState(ColarArray);
    const [dropdownTeams, setDropdownTeams] = useState([]);
    const [teamId, setTeamId] = useState(0);
    const teams = useSelector(state => state.member.teams);

    const onCreateBoard = async () => {
        const token = sessionStorage.getItem('token');
        const memberId = sessionStorage.getItem('memberId');
        const backgroundColor = getCheckdColor();
        const data = {
            board_name: title,
            public_scope: 'private',
            member_id: memberId,
            team_id: teamId === 0 ? null : teamId,
            background_color: backgroundColor,
        };

        const result = await dispatch(createBoard({token, data}));

        if (result.success) { 
            history.push('/board/' + result.data.data.board.board_id);
        } else {
            console.log('create board fail');
        }
    };

    useEffect(() => {
        setTitle('');
    }, [setTitle])

    const onColorBlockClick = (id) => {
        const newArray = [ ...colorArray ];
        newArray.forEach(item => {
            if (item[0] === id) item[2] = true;
            else item[2] = false;
        });

        setColorArray(newArray);
    };

    const getCheckdColor = () => {
        for (let i=0; i < colorArray.length; i++)
            if (colorArray[i][2] === true)
                return colorArray[i][1];
    }


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const memberId = sessionStorage.getItem('memberId');

        dispatch(getTeams({token, memberId}));
    }, []);

    useEffect(() => {
        let datas = [];
        if (teams && Array.isArray(teams)) {
            datas = teams.map(team => ({id: team.team_id, value: team.team_name}));
        }
        console.warn('datas ; ' + JSON.stringify(datas));
        datas.unshift({id: 0, value: 'No Team'});
        setDropdownTeams(datas);
    }, [teams]);

    const onTeamSelected = team => {
        setTeamId(team.id);
    }

    return (
        <CreateModal visible={visible} onCloseModal={onCloseModal}>
            <CreateBoardContainer>
                <CreateBoardContent>
                    <TitleInput value={title} onChange={onChangeTitle} placeholder='Add board title' />
                    <DropDown data={dropdownTeams} onSelected={onTeamSelected}/>
                </CreateBoardContent>
                <ColorContent>
                    {
                        colorArray.map((item, index) => 
                            <ColorBlock data={item} onColorBlockClick={onColorBlockClick} key={index} /> 
                        )
                    }
                </ColorContent>
            </CreateBoardContainer>
            <CreateBoardControl>
                <Button type='primary' onClick={onCreateBoard}>Create</Button> &nbsp;
                <Button type='default' onClick={onCloseModal}>Cancel</Button>
            </CreateBoardControl>
        </CreateModal>
    )

};

export default React.memo(CreateBoardModal);

const ColorBlockContainer = styled.div`
    width: 32px;
    height: 32px;
    background-color: #${props => props.backgroundColor};
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
    display: ${props => props.checked ? 'inline-block' : 'none'};
`;

const ColorBlock = ({data, onColorBlockClick}) => {
    const colorId = data[0];
    const backgroundColor = data[1];
    const checked = data[2];

    const onBlockClick = () => {
        if (checked === true) return;

        onColorBlockClick(colorId)
    }

    return (
        <ColorBlockContainer backgroundColor={backgroundColor} onClick={onBlockClick}>
            <CustomIcon icon={faCheck} checked={checked} size='xs'/>
        </ColorBlockContainer>
    );
};

