import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopupOver = styled.div`
	box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	display: ${(props) => (props.visible ? 'block' : 'none')};
	margin: 0px 0 0 0px;
	min-width: 300px;
	min-height: 100px;
	position: absolute;
	right: auto;
	z-index: 10;
`;

const SideBarPopup = ({ visible, children }) => {
	return <PopupOver visible={visible}>{children}</PopupOver>;
};

SideBarPopup.propTypes = {
	visible: PropTypes.bool.isRequired,
	children: PropTypes.node,
};

export default React.memo(SideBarPopup);
