import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../../components/useInput';

const Container = styled.div`
	background: none;
`;

const LabelWrapper = styled.div`
	padding: 8px 16px 8px 16px;
	display: ${props => (props.isEditting ? 'none' : 'block')};
	font-size: 16px;
`;

const EditWrapper = styled.div`
	padding: 8px 8px 8px 8px;
	display: ${props => (props.isEditting ? 'block' : 'none')};
`;

const InputField = styled.input`
	border: none;
	font-size: 16px;
	background: white;
	box-shadow: none;
	overflow: hidden;
	min-height: 26px;
	overflow-wrap: break-word;
	width: calc(100% - 8px);
	resize: none;
	padding-left: 8px;
`;

const ListTitle = ({ title, onUpdate }) => {
	const inputRef = useRef(null);
	const [inputTitle, onChangeInputTitle] = useInput(title);
	const [isEditting, setIsEditting] = useState(false);

	const onToggle = () => setIsEditting(!isEditting);

	useEffect(() => {
		if (isEditting) inputRef.current.focus();
		else {
			console.log(inputTitle + ', ' + title);
			if (inputTitle === title) return;

			onUpdate(inputTitle);
		}
	}, [isEditting, inputTitle, title, onUpdate]);

	return (
		<Container>
			<LabelWrapper isEditting={isEditting} onClick={onToggle}>
				{inputTitle}
			</LabelWrapper>
			<EditWrapper isEditting={isEditting}>
				<InputField ref={inputRef} onBlur={onToggle} value={inputTitle} onChange={onChangeInputTitle} />
			</EditWrapper>
		</Container>
	);
};

export default React.memo(ListTitle);
