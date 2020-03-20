import React from 'react';
import styled from 'styled-components/macro';

const BoxContainer = styled.div`
	box-sizing: border-box;
	border-radius: 3px;
	color: white;
	cursor: pointer;
	font-size: 16px;
	font-weight: 700;
	height: 96px;
	margin: 0 2% 2% 0;
	padding: 8px;
	width: 23.5%;

	// desktop, tablet
	@media only screen and (min-width: 769px) {
		margin: 0 2% 2% 0;
		width: 23.5%;
		&:nth-of-type(4n) {
			margin-right: 0;
		}
	}

	// phone
	@media only screen and (min-width: 481px) and (max-width: 768px) {
		margin: 0 2% 2% 0;
		width: 32%;
		&:nth-of-type(3n) {
			margin-right: 0;
		}
	}

	// low resolution phone
	@media only screen and (max-width: 480px) {
		margin: 0 3% 3% 0;
		width: 48.5%;
		&:nth-of-type(2n) {
			margin-right: 0;
		}
	}
`;

const BoardBox = ({ className, text, onClick }) => {
	return (
		<BoxContainer className={className} onClick={onClick}>
			{text}
		</BoxContainer>
	);
};

export default BoardBox;
