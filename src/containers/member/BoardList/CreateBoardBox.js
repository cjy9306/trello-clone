import React from 'react';
import styled from 'styled-components/macro';
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

const CreateBoardBox = ({ text, onClick }) => {
	return <CreateBox text={text} onClick={onClick} />;
};

export default React.memo(CreateBoardBox);
