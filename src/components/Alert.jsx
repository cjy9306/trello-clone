import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SuccessBackgroundColor = '#f4ffeb';
const SuccessBorderColor = '#ace98b';

const InfoBackgroundColor = '#e1f6fe';
const InfoBorderColor = '#83cffd';

// Warning, default
const WarningBackgroundColor = '#fffae4';
const WarningBorderColor = '#ffe18b';

const ErrorBackgroundColor = '#ffefee';
const ErrorBorderColor = '#ff9895';

const AlertContainer = styled.div`
	display: ${(props) => (props.visible ? 'inline-block' : 'none')};
	background-color: ${(props) => props.backgroundColor};
	border: 1px solid ${(props) => props.borderColor};
	color: black;
	padding: 8px 15px;
	font-size: 14px;
	line-height: 1.5;
`;

/*
 *	각종 정보(성공, 정보, 에러)를 위한 블락을 띄우는 컴포넌트
 *
 *	@className - Styled-component 상속을 위한 prop
 *	@type - 블락 타입(success, info, warning, error)
 *	@message - 블락내에 표시될 메시지
 *	@visible - 해당 블락을 ui에 표시하는 flag로 true, false 값으로 표시
 */
const Alert = ({ className, type, message, visible }) => {
	let backgroundColor = WarningBackgroundColor;
	let borderColor = WarningBorderColor;

	if (type === 'success') {
		backgroundColor = SuccessBackgroundColor;
		borderColor = SuccessBorderColor;
	} else if (type === 'info') {
		backgroundColor = InfoBackgroundColor;
		borderColor = InfoBorderColor;
	} else if (type === 'error') {
		backgroundColor = ErrorBackgroundColor;
		borderColor = ErrorBorderColor;
	}

	return (
		<AlertContainer className={className} backgroundColor={backgroundColor} visible={visible} borderColor={borderColor}>
			{message}
		</AlertContainer>
	);
};

Alert.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	message: PropTypes.string,
	visible: PropTypes.bool,
};

export default React.memo(Alert);
