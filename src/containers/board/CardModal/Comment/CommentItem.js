import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, getCard } from '../../../../modules/board';
import { convertDateClientTimezone } from '../../../../CommonUtils';

const Container = styled.div`
	margin-bottom: 24px;
`;

const Header = styled.div`
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

const CustomIcon = styled(FontAwesomeIcon)`
	color: #949996;
	font-size: 20px;
	position: absolute;
	padding: 6px 0 0 10px;

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

const CommentItem = ({ card, comment }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);

	const onDelete = async () => {
		const result = await dispatch(deleteComment({ boardId: board.board_id, comment_id: comment.comment_id }));

		if (result.success) dispatch(getCard({ boardId: board.board_id, card_id: card.card_id }));
	};

	return (
		<Container>
			<Header>
				<CustomIcon icon={faUserCircle} size="xs" />
				<b>{comment.member.username}</b> &nbsp;&nbsp; {convertDateClientTimezone(comment.create_time)}
			</Header>
			<ContentContainer>
				<ContentWrapper>
					{// new line을 출력하기 위한 기능
					comment.contents &&
						comment.contents.split('\n').map((line, index) => (
							<span key={index}>
								{line}
								<br />
							</span>
						))}
				</ContentWrapper>
			</ContentContainer>
			<ControlContainer>
				&nbsp;&nbsp;
				<a href="/#" onClick={() => onDelete()}>
					Delete
				</a>
			</ControlContainer>
		</Container>
	);
};

CommentItem.propTypes = {
	card: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired
};

export default React.memo(CommentItem);
