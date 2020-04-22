import React from 'react';
import styled, { keyframes } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faInfoCircle, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setMessageStates } from '../modules/common';

const MessageContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 80px;
	width: 100%;
	display: ${(props) => (props.visible === true ? 'flex' : 'none')};
	justify-content: center;
`;

const moveOpen = keyframes`{
    from {-webkit-transform: translate(0,-100px);}
    10% {-webkit-transform: translate(0,20px);}
    12% {-webkit-transform: translate(0,22px);}
    16% {-webkit-transform: translate(0,20px);}
    80% {-webkit-transform: translate(0,20px);}
    85% {-webkit-transform: translate(0,25px);}
    to {-webkit-transform: translate(0,-100px);}
  }`;

const MessageContent = styled.div`
	margin: 0 auto;
	min-width: 220px;
	height: 32px;
	line-height: 32px;
	margin-top: 25px;
	padding: 5px 10px 5px 10px;
	text-align: center;
	border-radius: 4px;
	background-color: white;
	display: block;
	box-shadow: rgba(0, 0, 0, 0.5) 0 0 10px;
	animation: ${moveOpen} 4s;
	-webkit-animation: ${moveOpen} 4s;
	-webkit-animation-fill-mode: forwards;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	margin-right: 10px;
	font-size: 16px;
`;

const ErrorIcon = styled(CustomIcon)`
	color: red;
`;

const InfoIcon = styled(CustomIcon)`
	color: blue;
`;

const WarnIcon = styled(CustomIcon)`
	color: orange;
`;

const SuccessIcon = styled(CustomIcon)`
	color: green;
`;

const Message = ({ className, visible, text, type }) => {
	const dispatch = useDispatch();

	const onAnimationEnd = () => dispatch(setMessageStates(false, ''));

	return (
		<MessageContainer className={className} visible={visible} onAnimationEnd={onAnimationEnd}>
			<MessageContent>
				{type === 'error' && <ErrorIcon icon={faExclamationCircle} size="xs" />}
				{type === 'info' && <InfoIcon icon={faInfoCircle} size="xs" />}
				{type === 'warn' && <WarnIcon icon={faExclamationTriangle} size="xs" />}
				{type === 'success' && <SuccessIcon icon={faCheckCircle} size="xs" />}
				{text}
			</MessageContent>
		</MessageContainer>
	);
};

Message.propTypes = {
	className: PropTypes.string,
	visible: PropTypes.bool,
	text: PropTypes.string,
	type: PropTypes.string,
};

export default React.memo(Message);
