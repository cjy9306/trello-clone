import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

const BoxContainer = styled.div`
    width: 23.5%;
    margin: 0 2% 2% 0;
    box-sizing: border-box;
    padding: 8px;
    background-color: #${props => props.backgroundColor};
    height: 96px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: white;
    &:nth-of-type(4n) {
        margin-right: 0;
    }
`;


const BoardTitleBox = ({board}) => {

    const history = useHistory();

    const onBoxClick = () => {
        history.push('/board/' + board.board_id);
    };

    return (
        <BoxContainer backgroundColor={board.background_color} onClick={onBoxClick}>
            {board.board_name}
        </BoxContainer>
    );
};

export default React.memo(BoardTitleBox);