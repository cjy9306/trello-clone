import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

const ModalContainer = styled.div`
	display: ${(props) => (props.visible ? 'flex' : 'none')};
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

/*
 *	공통 Modal 컴포넌트. 보통 해당 컴포넌트를 css 상속하여 사용함
 *
 *	@className - Styled-components를 상속을 위한 prop
 *	@visible - 해당 컴포넌트의 출력 여부. 현재는 리덕스의 common에서 상태로 관리중
 *	@onCloseModal - 해당 모델을 ui에서 제거하는 함수
 *	@children - 하위 컴포넌트
 */
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

Modal.propTypes = {
	className: PropTypes.string,
	visible: PropTypes.bool,
	onCloseModal: PropTypes.func.isRequired,
	children: PropTypes.node,
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

ConfirmModal.displayName = 'ConfirmModal';
ConfirmModal.propTypes = {
	className: PropTypes.string,
	visible: PropTypes.bool,
	onCloseModal: PropTypes.func.isRequired,
	onClickOk: PropTypes.func,
	message: PropTypes.string,
};
