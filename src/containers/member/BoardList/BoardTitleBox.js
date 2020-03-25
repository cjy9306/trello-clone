import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BoardBox from './BoardBox';

const TitleBox = styled(BoardBox)`
	background-color: #${props => props.backgroundColor};
`;

const BoardTitleBox = ({ board }) => {
	const backgroundColor = board ? board.background_color : '666666';
	const history = useHistory();
	const onBoxClick = useCallback(() => history.push('/board/' + board.board_id), [history, board]);

	return <TitleBox backgroundColor={backgroundColor} onClick={onBoxClick} text={board.board_name} />;
};

BoardTitleBox.propTypes = {
	board: PropTypes.object.isRequired
};

export default React.memo(BoardTitleBox);
