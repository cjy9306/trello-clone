import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Size
const DefaultHeight = '20px';
const DefaultFontSize = '14px';
const DefaultPadding = '4px 8px;';
const DefaultFontWeight = '700';

const LargeHeight = '24px';
const LargeFontSize = '16px';
const LargePadding = '8px 8px';
const LargeFontWeight = '700';

const SmallHeight = '18px';
const SmallFontSize = '12px';
const SmallPadding = '0px 8px';
const SmallFontWeight = '500';

const TagContainer = styled.span`
	background-color: ${props => props.backgroundColor};
	border: none;
	border-radius: 4px;
	box-shadow: none;
	padding: ${props => props.padding};
	line-height: 1.499;
	height: ${props => props.height};
	font-size: ${props => props.fontSize};
	font-weight: ${props => props.fontWeight};
	color: white;
	text-align: center;
	display: inline-block;
`;

const Tag = ({ className, color, size, children }) => {
	let fontSize = DefaultFontSize;
	let height = DefaultHeight;
	let padding = DefaultPadding;
	let fontWeight = DefaultFontWeight;

	if (size === 'large') {
		fontSize = LargeFontSize;
		height = LargeHeight;
		padding = LargePadding;
		fontWeight = LargeFontWeight;
	} else if (size === 'small') {
		fontSize = SmallFontSize;
		height = SmallHeight;
		padding = SmallPadding;
		fontWeight = SmallFontWeight;
	}

	return (
		<TagContainer
			className={className}
			backgroundColor={color}
			height={height}
			fontSize={fontSize}
			padding={padding}
			fontWeight={fontWeight}
		>
			{children}
		</TagContainer>
	);
};

Tag.propTypes = {
	className: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string,
	children: PropTypes.node
};

export default React.memo(Tag);
