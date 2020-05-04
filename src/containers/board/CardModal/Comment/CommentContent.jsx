import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import TextArea from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../../hooks/useInput';
import Button from '../../../../components/Button';
import { createComment, getCard } from '../../../../modules/board';
import CommentItem from './CommentItem';

const Container = styled.div`
	position: relative;
	font-size: 20px;

	@media only screen and (min-width: 669px) {
		margin: 8px 0 24px 40px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		margin: 8px 0 24px 8px;
	}
`;

const CommentHeader = styled.div`
	margin-bottom: 16px;
`;

const EditContainer = styled.div`
	box-shadow: 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	background-color: #fff;
	border-radius: 3px;
	margin: 0 16px 24px 0;
	line-height: 20px;
	overflow: hidden;
	width: 100%;
`;

const EditField = styled(TextArea)`
	background-color: #fff;
	box-sizing: content-box;
	box-shadow: none;
	border: 0;
	font-size: 14px;
	height: 20px;
	resize: none;
	overflow-wrap: break-word;
	overflow: hidden;
	outline: 0;
	padding: 8px 12px;
	position: relative;
	width: 100%;
`;

const ControlContainer = styled.div`
	padding: 8px 0 8px 8px;
`;

const CommentViewContainer = styled.div``;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 20px;
	position: absolute;
	padding: 6px 0 0 10px;

	@media only screen and (min-width: 669px) {
		left: -40px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		left: 0px;
		margin-right: 8px;
		position: relative;
		padding-left: 0;
	}
`;

/*
 *	Card의 Comment 컴포넌트
 *
 */
const CommentContent = ({ card }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const [editComment, onChangeComment, setEditComment] = useInput('');
	const cardComments = useSelector((state) => state.board.cardComments);

	const onCreateComment = async () => {
		if (editComment === '') return;

		const memberId = sessionStorage.getItem('memberId');
		const data = {
			comment: editComment,
			memberId,
		};

		const result = await dispatch(createComment({ boardId: board.board_id, cardId: card.card_id, data }));

		if (result.success) {
			dispatch(getCard({ boardId: board.board_id, cardId: card.card_id }));
			setEditComment('');
		}
	};

	return (
		<Container>
			<CommentHeader>
				<CustomIcon icon={faComment} size="xs" />
				Comments
			</CommentHeader>
			<EditContainer>
				<EditField placeholder="Write a comment..." value={editComment} onChange={onChangeComment} />
				<ControlContainer>
					<Button type="primary" onClick={onCreateComment}>
						Save
					</Button>
				</ControlContainer>
			</EditContainer>
			<CommentViewContainer>
				{cardComments &&
					cardComments.map((comment) => <CommentItem comment={comment} card={card} key={comment.comment_id} />)}
			</CommentViewContainer>
		</Container>
	);
};

CommentContent.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(CommentContent);
