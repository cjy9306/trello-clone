import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = styled.button`
	background-color: hsla(0, 0%, 100%, 0.24);
	border: 0;
	border-radius: 3px;
	cursor: pointer;
	font-size: 14px;
	overflow: hidden;
	height: 32px;
	line-height: 32px;
	padding: 0 12px;
	color: #fff;
`;

/*
 *	global header에서 사용되는 button.
 *
 *	@className - Styled-components를 상속을 위한 prop
 *	@children - 하위 컴포넌트
 *	@onClick - 클릭시 이벤트 함수
 */
const HeaderButton = ({ className, children, onClick }) => {
	return (
		<ButtonContainer className={className} onClick={onClick}>
			{children}
		</ButtonContainer>
	);
};

HeaderButton.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	onClick: PropTypes.func,
};

export default React.memo(HeaderButton);
