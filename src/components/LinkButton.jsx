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

// a 태그를 이용한 Link 용 버튼
const LinkButtonConatiner = styled.a`
	display: block;
	background-color: ${(props) => props.backgroundColor};
	box-shadow: none;
	border: none;
	cursor: pointer;
	box-sizing: border-box;
	overflow: hidden;
	height: ${(props) => props.height};
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color};
	padding: 6px 12px;
	position: relative;
	text-decoration: none;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.499;
	font-weight: 400;
	border-radius: 3px;

	&:hover {
		background-color: ${(props) => props.hoverBackgroundColor};
	}
`;

/*
 *	링크버튼 컴포넌트. 버튼하고 비슷한 동작이지만 ui가 다르게 구성되어 있음.
 *	trello의 card details의 sidebar 영역에 사용
 *
 *	@className - Styled-component 상속을 위한 prop
 *	@type - 버튼 종류(default, primary, danger)
 *	@size - 버튼 크기(large, default, small)
 *	@children - 하위 컴포넌트
 *	@onClick - 버튼 클릭시 이벤트 함수
 */
const LinkButton = ({ className, type, size, children, onClick }) => {
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
};

LinkButton.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	size: PropTypes.string,
	children: PropTypes.node,
	onClick: PropTypes.func,
};

export default React.memo(LinkButton);
