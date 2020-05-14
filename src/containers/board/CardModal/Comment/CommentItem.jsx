import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, getCard } from '../../../../modules/board';
import { convertDateClientTimezone } from '../../../../common/CommonUtils';
import ContentsWithLF from '../../../../components/ContentsWithLF';

const CommentItemContainer = styled.div`
	margin-bottom: 24px;
`;

const CommentItemHeader = styled.div`
	font-size: 16px;
	margin-bottom: 12px;
`;

const ContentContainer = styled.div`
	background-color: #fff;
	border-radius: 3px;
	box-shadow: 0 1px 2px -1px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	box-sizing: border-box;
	display: inline-block;
	font-size: 16px;
	text-overflow: ellipsis;
	max-width: 100%;
`;

const ContentWrapper = styled.div`
	overflow-wrap: break-word;
	padding: 8px 12px;
	work-break; break-word;
`;

const ControlContainer = styled.div`
	font-size: 12px;
	line-height: 24px;
	& > a {
		color: black;
		text-decoration: underline;
	}
	a:visited {
		color: inherit;
	}
`;

const UserIcon = styled(FontAwesomeIcon)`
	color: #949996;
	font-size: 20px;
	position: absolute;
	padding: 0 0 0 10px;

	@media only screen and (min-width: 669px) {
		left: -40px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		left: 0px;
		position: relative;
		padding-left: 0;
		margin-right: 8px;
	}
`;

const DeleteButton = styled.a`
	cursor: pointer;
`;

/*
 *	Comment의 각 item 컴포넌트
 *
 */
const CommentItem = ({ card, comment }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);

	const handleCommentDelete = useCallback(async () => {
		const result = await dispatch(deleteComment({ boardId: board.board_id, commentId: comment.comment_id }));
		if (result.success === true) dispatch(getCard({ boardId: board.board_id, cardId: card.card_id }));
	}, [dispatch, board, card, comment]);

	return (
		<CommentItemContainer>
			<CommentItemHeader>
				<UserIcon icon={faUserCircle} size="xs" />
				<b>{comment.member.name}</b> &nbsp;&nbsp; {convertDateClientTimezone(comment.create_time)}
			</CommentItemHeader>
			<ContentContainer>
				<ContentWrapper>
					<ContentsWithLF contents={comment.contents} />
				</ContentWrapper>
			</ContentContainer>
			<ControlContainer>
				<DeleteButton onClick={handleCommentDelete}>Delete</DeleteButton>
			</ControlContainer>
		</CommentItemContainer>
	);
};

CommentItem.propTypes = {
	card: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
};

export default React.memo(CommentItem);
