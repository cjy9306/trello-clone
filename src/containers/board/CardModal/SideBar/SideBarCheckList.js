import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useInput from '../../../../hooks/useInput';
import Button from '../../../../components/Button';

const SideBarCheckListContainer = styled.div`
	background-color: #fff;
`;

const SideBarCheckListHeader = styled.div`
	line-height: 32px;
	height: 32px;
	padding: 8px 16px 0 16px;
	text-align: center;
`;

const SideBarCheckListContent = styled.div`
	padding: 20px 16px 16px 16px;
`;

const CloseSpan = styled.span`
	color: #aaaaaa;
	font-size: 20px;
	font-weight: bold;
	margin-right: 8px;
	position: absolute;
	right: 0;
	&:hover,
	&:focus {
		color: #000;
		cursor: pointer;
		text-decoration: none;
	}
`;

const CheckListTitle = styled.div`
	font-size: 14px;
`;

const TitleInput = styled.input`
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	font-size: 14px;
	margin: 4px 0 12px 0;
	padding: 8px 12px;
	width: 100%;
`;

const SideBarCheckList = ({ onPopupToggle, onCreateCheckList }) => {
	const [title, onChangeTitle, setTitle] = useInput('');

	const onAddClick = async () => {
		onCreateCheckList(title);
	};

	useEffect(() => {
		setTitle('');
	}, [onCreateCheckList, setTitle]);

	return (
		<SideBarCheckListContainer>
			<SideBarCheckListHeader>
				Add CheckList
				<CloseSpan onClick={onPopupToggle}>&times;</CloseSpan>
				<hr />
			</SideBarCheckListHeader>
			<SideBarCheckListContent>
				<CheckListTitle>Title</CheckListTitle>
				<TitleInput value={title} onChange={onChangeTitle} />
				<Button type="primary" onClick={onAddClick}>
					Add
				</Button>
			</SideBarCheckListContent>
		</SideBarCheckListContainer>
	);
};

SideBarCheckList.propTypes = {
	onPopupToggle: PropTypes.func.isRequired,
	onCreateCheckList: PropTypes.func.isRequired
};

export default SideBarCheckList;
