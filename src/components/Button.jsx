import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
	background-color: ${(props) => props.backgroundColor};
	border: none;
	border-radius: 4px;
	box-shadow: none;
	padding: 0 12px;
	height: ${(props) => props.height};
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color};
	text-align: center;
	line-height: 1.499;
	cursor: pointer;
	width: ${(props) => (props.isBlock === true ? '100%' : 'auto')};
	&:hover {
		background-color: ${(props) => props.hoverBackgroundColor};
	}
`;

/*
 *	버튼 컴포넌트
 *
 *	@className - Styled-component 상속을 위한 prop
 *	@type - 버튼 종류(default, primary, danger)
 *	@size - 버튼 크기(large, default, small)
 *	@background - 버튼 배경색상으로 default로 null, 색상은 css표현식으로 주어져야함.
 *	@children - 하위 컴포넌트
 *	@block - width를 결정함, block이 true면 100%고 false면 auto
 *	@onClick - 버튼 클릭시 이벤트 함수
 */
const Button = ({ className, type, size, background = null, children, isBlock = false, onClick }) => {
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
			isBlock={isBlock}
		>
			{children}
		</ButtonContainer>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	size: PropTypes.string,
	background: PropTypes.string,
	children: PropTypes.node,
	isBlock: PropTypes.bool,
	onClick: PropTypes.func,
};

export default React.memo(Button);
