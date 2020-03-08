import React from 'react';
import styled from 'styled-components/macro';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ModalContainer = styled.div`
	display: ${props => (props.visible ? 'flex' : 'none')};
	align-items: flex-start;
	align-content: space-between;
	justify-content: center;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
	background-color: #f4f5f7;
	margin: 48px auto 80px auto;
	border-radius: 3px;
	color: #000;
`;

const CloseSpan = styled.span`
	color: #aaaaaa;
	float: right;
	margin: 8px 12px 0 0;
	font-size: 24px;
	font-weight: bold;
	&:hover,
	&:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
`;

const Modal = ({ className, visible = false, onCloseModal, children }) => {
	return (
		<ModalContainer visible={visible}>
			<ModalContent className={className}>
				<CloseSpan onClick={onCloseModal}>&times;</CloseSpan>
				{children}
			</ModalContent>
		</ModalContainer>
	);
};

export default React.memo(Modal);

const ConfirmModalContainer = styled(Modal)`
	max-width: 320px;
`;

const ConfirmMessage = styled.div`
	margin: 32px 32px 16px 32px;
	font-size: 16px;
	font-weight: 500;
`;

const ConfirmControl = styled.div`
	float: right;
	margin: 0 32px 16px 32px;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 16px;
	margin-right: 16px;
	color: red;
`;

export const ConfirmModal = React.memo(({ className, visible = false, onCloseModal, onClickOk, message }) => {
	return (
		<ConfirmModalContainer className={className} visible={visible} onCloseModal={onCloseModal}>
			<ConfirmMessage>
				<CustomIcon icon={faExclamationCircle} size="xs" />
				{message}
			</ConfirmMessage>
			<ConfirmControl>
				<Button type="primary" onClick={onClickOk}>
					YES
				</Button>
				&nbsp;
				<Button type="default" onClick={onCloseModal}>
					NO
				</Button>
			</ConfirmControl>
		</ConfirmModalContainer>
	);
});
