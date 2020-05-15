import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const SideBarLabelsItemContainer = styled.div`
	position: relative;
`;

const SideBarLabelsItemContent = styled.div`
	background-color: ${(props) => (props.color ? props.color : 'grey')};
	border-radius: 3px;
	cursor: pointer;
	color: white;
	font-weight: 400;
	font-size: 16px;
	margin-bottom: 4px;
	min-height: 20px;
	padding: 6px 32px 6px 12px;
	position: relative;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 215px;
`;

const SideBarLabelItemCheck = styled.div`
	display: ${(props) => (props.checked ? 'block' : 'none')};
	top: 0;
	position: absolute;
	right: 0;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	border-radius: 3px;
	cursor: pointer;
	font-size: 16px;
	position: absolute;
	padding: 8px;
	right: 9px;
	top: 0px;
`;

/*
 *	SideBarLables의 각 item 컴포넌트
 *
 */
const SideBarLabelsItem = ({ label, defaultChecked, onLabelsItemClick }) => {
	const [checked, setChecked] = useState(false);

	const handleItemClick = useCallback(() => {
		const result = !checked;
		setChecked(result);
		onLabelsItemClick(label.label_id, result);
	}, [setChecked, onLabelsItemClick]);

	useEffect(() => {
		setChecked(defaultChecked);
	}, [defaultChecked]);

	return (
		<SideBarLabelsItemContainer>
			<SideBarLabelsItemContent color={`${label.color}`} onClick={handleItemClick}>
				{label.label_name}
				<SideBarLabelItemCheck checked={checked}>
					<CustomIcon icon={faCheck} size="xs" />
				</SideBarLabelItemCheck>
			</SideBarLabelsItemContent>
		</SideBarLabelsItemContainer>
	);
};

SideBarLabelsItem.propTypes = {
	label: PropTypes.object.isRequired,
	defaultChecked: PropTypes.bool.isRequired,
	onLabelsItemClick: PropTypes.func.isRequired,
};

export default React.memo(SideBarLabelsItem);
