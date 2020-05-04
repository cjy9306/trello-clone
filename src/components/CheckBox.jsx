import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const CheckBoxContainer = styled.div`
	display: inline-block;
`;

const CheckedContent = styled.div`
	display: ${(props) => (props.checked ? 'inline-block' : 'none')};
`;

const UncheckedContent = styled.div`
	display: ${(props) => (props.checked ? 'none' : 'inline-block')};
`;

const uncheckedStyle = {
	color: '#dfe1e6',
	fontSize: '20px',
};

const checkedStyle = {
	color: '#5ba4cf',
	fontSize: '20px',
};

/*
 *	체크박스 컴포넌트
 *
 *	@className - Styled-component 상속을 위한 prop
 *	@defaultChecked - 처음 생성시 체크여부를 설정. true or false의 값
 *	@onClick - 체크박스 클릭시 이벤트 함수
 */
const CheckButton = ({ className, defaultChecked, onClick }) => {
	const [checked, setChecked] = useState(defaultChecked);

	const onToggle = () => {
		setChecked(!checked);

		if (onClick != null) onClick(!checked);
	};

	return (
		<CheckBoxContainer className={className}>
			<CheckedContent checked={checked} onClick={onToggle}>
				<FontAwesomeIcon icon={faCheckSquare} style={checkedStyle} size="2x" />
			</CheckedContent>
			<UncheckedContent checked={checked} onClick={onToggle}>
				<FontAwesomeIcon icon={faSquare} style={uncheckedStyle} size="2x" />
			</UncheckedContent>
		</CheckBoxContainer>
	);
};

CheckButton.propTypes = {
	className: PropTypes.string,
	defaultChecked: PropTypes.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default React.memo(CheckButton);
