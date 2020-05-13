import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BoardBox from './BoardBox';

const TitleBox = styled(BoardBox)`
	background-color: #${(props) => props.backgroundColor};
`;

/*
 *	실제 board를 연결하는 box 컴포넌트. BoardBox를 상속
 *
 */
const BoardTitleBox = ({ board }) => {
	const backgroundColor = board ? board.background_color : '666666';
	const history = useHistory();
	const handleBoxClick = useCallback(() => history.push('/board/' + board.board_id), [history, board]);

	return <TitleBox backgroundColor={backgroundColor} onClick={handleBoxClick} text={board.board_name} />;
};

BoardTitleBox.propTypes = {
	board: PropTypes.object.isRequired,
};

export default React.memo(BoardTitleBox);
