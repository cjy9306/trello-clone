import React from 'react';
import styled from 'styled-components/macro';

// Size
const DefaultHeight = '32px';
const DefaultFontSize = '14px';

const LargeHeight = '36px';
const LargeFontSize = '16px';

const SmallHeight = '24px';
const SmallFontSize = '12px';

// Default
const DefaultBackgroundColor = 'rgba(9, 30, 66, .07)';
const DefaultHoverBackgroundColor = 'rgba(9, 30, 66, .17)';
const DefaultColor = 'black';

// Primary
const PrimaryBackgroundColor = 'rgba(87, 167, 66, 1)';
const PrimaryHoverBackgroundColor = 'rgba(87, 167, 66, 0.7)';
const PrimaryColor = 'white';

// Danger
const DangerBackgroundColor = 'rgba(255, 77, 79, 1)';
const DangerHoverBackgroundColor = 'rgba(255, 77, 79, 0.7)';
const DangerColor = 'white';

const ButtonContainer = styled.button`
	background-color: ${props => props.backgroundColor};
	border: none;
	border-radius: 4px;
	box-shadow: none;
	padding: 0 12px;
	height: ${props => props.height};
	font-size: ${props => props.fontSize};
	color: ${props => props.color};
	text-align: center;
	line-height: 1.499;
	cursor: pointer;
	width: ${props => (props.block ? '100%' : 'auto')};
	&:hover {
		background-color: ${props => props.hoverBackgroundColor};
	}
`;

const Button = ({ className, type, size, background = null, children, block, onClick }) => {
	let backgroundColor = DefaultBackgroundColor;
	let hoverBackgroundColor = DefaultHoverBackgroundColor;
	let height = DefaultHeight;
	let fontSize = DefaultFontSize;
	let color = DefaultColor;

	if (type === 'primary') {
		backgroundColor = PrimaryBackgroundColor;
		hoverBackgroundColor = PrimaryHoverBackgroundColor;
		color = PrimaryColor;
	} else if (type === 'danger') {
		backgroundColor = DangerBackgroundColor;
		hoverBackgroundColor = DangerHoverBackgroundColor;
		color = DangerColor;
	}

	if (size === 'large') {
		height = LargeHeight;
		fontSize = LargeFontSize;
	} else if (size === 'small') {
		height = SmallHeight;
		fontSize = SmallFontSize;
	}

	if (background !== null) {
		backgroundColor = background;
	}

	return (
		<ButtonContainer
			className={className}
			backgroundColor={backgroundColor}
			hoverBackgroundColor={hoverBackgroundColor}
			height={height}
			fontSize={fontSize}
			color={color}
			onClick={onClick}
			block={block}
		>
			{children}
		</ButtonContainer>
	);
};

export default React.memo(Button);

// a 태그를 이용한 Link 용 버튼
const LinkButtonConatiner = styled.a`
	display: block;
	background-color: ${props => props.backgroundColor};
	box-shadow: none;
	border: none;
	cursor: pointer;
	box-sizing: border-box;
	overflow: hidden;
	height: ${props => props.height};
	font-size: ${props => props.fontSize};
	color: ${props => props.color};
	padding: 6px 12px;
	position: relative;
	text-decoration: none;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.499;
	font-weight: 400;
	border-radius: 3px;

	&:hover {
		background-color: ${props => props.hoverBackgroundColor};
	}
`;

export const LinkButton = React.memo(({ type, size, className, children, onClick }) => {
	let backgroundColor = DefaultBackgroundColor;
	let hoverBackgroundColor = DefaultHoverBackgroundColor;
	let height = DefaultHeight;
	let fontSize = DefaultFontSize;
	let color = DefaultColor;

	if (type === 'primary') {
		backgroundColor = PrimaryBackgroundColor;
		hoverBackgroundColor = PrimaryHoverBackgroundColor;
		color = PrimaryColor;
	} else if (type === 'danger') {
		backgroundColor = DangerBackgroundColor;
		hoverBackgroundColor = DangerHoverBackgroundColor;
		color = DangerColor;
	}

	if (size === 'large') {
		height = LargeHeight;
		fontSize = LargeFontSize;
	} else if (size === 'small') {
		height = SmallHeight;
		fontSize = SmallFontSize;
	}

	return (
		<LinkButtonConatiner
			className={className}
			backgroundColor={backgroundColor}
			hoverBackgroundColor={hoverBackgroundColor}
			height={height}
			fontSize={fontSize}
			color={color}
			onClick={onClick}
		>
			{children}
		</LinkButtonConatiner>
	);
});
