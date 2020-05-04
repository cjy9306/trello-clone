import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BoardBox from './BoardBox';

const CreateBox = styled(BoardBox)`
	background-color: rgba(9, 30, 66, 0.07);
	line-height: 96px;
	padding: 0 8px;
	text-align: center;
	color: #666;
	&:hover {
		background-color: rgba(9, 30, 66, 0.17);
	}
`;

/*
 *	create board 이벤트를 담은 box 컴포넌트. BoardBox를 상속함
 *
 */
const CreateBoardBox = ({ text, onClick }) => {
	return <CreateBox text={text} onClick={onClick} />;
};

CreateBoardBox.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default React.memo(CreateBoardBox);
