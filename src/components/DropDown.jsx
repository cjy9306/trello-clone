import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const DropDownContainer = styled.div`
	font-size: 14px;
`;

const DropDownHeader = styled.div`
	cursor: pointer;
	border: 1px solid;
	background: transparent;
	border: 0;
	text-decoration: none;
	box-shadow: none;
	text-align: left;
	padding: 2px 8px;
	line-height: 20px;
	&:hover {
		background-color: #e8e9ed;
	}
`;

const DropDownList = styled.div`
	display: ${(props) => (props.visible ? 'block' : 'none')};
	position: absolute;
	right: auto;
	margin: 0px 0 0 0px;
	min-width: 150px;
	box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	z-index: 10;
`;

const DropDownItem = styled.div`
	background-color: #fff;
	border: none;
	border-radius: 0;
	box-shadow: none;
	color: #172b4d;
	text-align: left;
	width: 100%;
	height: 100%;
	cursor: pointer;
	padding: 6px 12px;
	box-sizing: border-box;
	&:hover {
		background-color: #e8e9ed;
	}
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 12px;
	color: black;
	margin-left: 12px;
`;

/*
 *	dropdown 컴포넌트
 *
 *	@className - Styled-components의 상속에 쓰임
 *	@data - dropdown에 출력할 데이터, 배열로 입력해야 하며 각 배열 element는 다음의 객채로 구성되어 있어야함. {id: teamId, value: teamName}
 *	@onSelected - 각 요소가 선택되었을 때의 이벤트, onSelected( @배열 element )
 */
const DropDown = ({ className, data, onSelected }) => {
	const [listVisible, setListVisible] = useState(false);
	const [selected, setSelected] = useState('');

	useEffect(() => {
		if (data && data.length > 0) setSelected(data[0].value);
	}, [data]);

	const onHeaderClick = () => {
		setListVisible(!listVisible);
	};

	const onListItemClick = (item) => {
		setListVisible(false);
		setSelected(item.value);

		if (typeof onSelected === 'function') onSelected(item);
	};

	return (
		<DropDownContainer className={className}>
			<DropDownHeader onClick={onHeaderClick}>
				{selected}
				<CustomIcon icon={faArrowDown} size="xs" />
			</DropDownHeader>
			<DropDownList visible={listVisible}>
				{data &&
					data.map((item, index) => (
						<DropDownItem onClick={() => onListItemClick(item)} key={index}>
							{item.value}
						</DropDownItem>
					))}
			</DropDownList>
		</DropDownContainer>
	);
};

DropDown.propTypes = {
	data: PropTypes.array.isRequired,
	onSelected: PropTypes.func,
	className: PropTypes.string,
};

export default React.memo(DropDown);
