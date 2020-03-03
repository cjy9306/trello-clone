import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons';
import TextArea from 'react-textarea-autosize'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getCard } from '../../../modules/board';
import CommentItem from './CommentItem';
import Button from '../../../components/Button';
import useInput from '../../../components/useInput';

const Container = styled.div`
    margin: 8px 0 24px 40px;
    position: relative;
    font-size: 20px;
`;

const CommentHeader = styled.div`
    margin-bottom: 16px;
`;

const EditContainer = styled.div`
    box-shadow: 0 1px 1px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
    line-height: 20px;
    width: 100%;
    margin: 0 16px 24px 0;
`;

const EditField = styled(TextArea)`
    background-color: #fff;
    box-sizing: content-box;
    width: 100%;
    resize: none;
    padding: 8px 12px;
    height: 20px;
    overflow-wrap: break-word;
    overflow: hidden;
    box-shadow: none;
    border: 0;
    font-size: 14px;
    outline: 0;
    position: relative;
`;

const ControlContainer = styled.div`
    padding: 8px 0 8px 8px;
`;

const CommentViewContainer = styled.div`
    
`;

const IconStyle = {
    left: '-40px',
    position: 'absolute',
    padding: '2px 0 0 10px',
    fontSize: '20px',
}

const CommentContent = ({card}) => {

    const dispatch = useDispatch();
    const board = useSelector(state => state.board.board);
    const [editComment, onChangeComment, setEditComment] = useInput('');
    const cardComments = useSelector(state => state.board.cardComments);

    const onCreateComment = async () => {
        if (editComment === '') return;

        const member_id = sessionStorage.getItem('memberId');
        const data = {
            comment: editComment,
            member_id,
        }

        const result = await dispatch(createComment({boardId: board.board_id, card_id: card.card_id, data}));

        if (result.success) {
            await dispatch(getCard({token, boardId: board.board_id, card_id: card.card_id}));
            setEditComment('');
        } else {
            console.log('can not create comment');
        }
    };

    return (
        <Container>
            <CommentHeader>
                <FontAwesomeIcon icon={faComment} size='xs' style={IconStyle} />
                Comments
            </CommentHeader>
            <EditContainer>
                <EditField placeholder='Write a comment...' value={editComment} onChange={onChangeComment}/>
                <ControlContainer>
                    <Button type='primary' onClick={onCreateComment}>Save</Button>
                </ControlContainer>
            </EditContainer>
            <CommentViewContainer>
                {
                    cardComments && 
                    cardComments.map(comment => <CommentItem comment={comment} card={card} key={comment.comment_id}/>)
                }
            </CommentViewContainer>
        </Container>
    );
};

export default React.memo(CommentContent);