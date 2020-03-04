import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import useInput from '../../../components/useInput';
import Button from '../../../components/Button';

const SideBarCheckListContainer = styled.div`
	background-color: #fff;
`;

const SideBarCheckListHeader = styled.div`
	text-align: center;
	line-height: 32px;
	height: 32px;
	padding: 8px 16px 0 16px;
`;

const SideBarCheckListContent = styled.div`
	padding: 20px 16px 16px 16px;
`;

const CloseSpan = styled.span`
	position: absolute;
	color: #aaaaaa;
	right: 0;
	font-size: 20px;
	font-weight: bold;
	margin-right: 8px;
	&:hover,
	&:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
`;

const CheckListTitle = styled.div`
	font-size: 14px;
`;

const TitleInput = styled.input`
	margin: 4px 0 12px 0;
	width: 100%;
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 8px 12px;
	font-size: 14px;
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

export default SideBarCheckList;
