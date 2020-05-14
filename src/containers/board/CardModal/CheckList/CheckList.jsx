import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CheckListItem from './CheckListItem';

const CheckListContainer = styled.div`
	display: ${(props) => (props.visible ? 'block' : 'none')};
	font-size: 20px;
	margin: 8px 0 40px 40px;
	position: relative;
`;

/*
 *	Card의 Checklist 컴포넌트
 *
 */
const CheckList = () => {
	const checklist = useSelector((state) => state.board.cardChecklist);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (checklist.length > 0) setVisible(true);
		else setVisible(false);
	}, [checklist]);

	return (
		<CheckListContainer visible={visible}>
			{checklist &&
				checklist.length > 0 &&
				checklist.map((checklist) => <CheckListItem checklist={checklist} key={checklist.checklist_id} />)}
		</CheckListContainer>
	);
};

export default React.memo(CheckList);
