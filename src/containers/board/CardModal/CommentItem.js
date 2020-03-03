import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, getCard } from '../../../modules/board'

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
    box-shadow: 0 1px 2px -1px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    box-sizing: border-box;
    display: inline-block;
    text-overflow: ellipsis;
    max-width: 100%;
    font-size: 16px;
`;

const ContentWrapper = styled.div`
    work-break; break-word;
    overflow-wrap: break-word;
    padding: 8px 12px;
`;

const ControlContainer = styled.div`
    font-size: 12px;
    line-height: 24px;
    & > a {
        text-decoration: underline;
    }
    a:visited {
        color: inherit;
    }
`;

const convertDateClientTimezone = (time) => {
    const tmpDate = new Date(time);
    const date = new Date(tmpDate.getTime() + tmpDate.getTimezoneOffset()*60);

    return date.getFullYear() + "-" + (date.getMonth()+1) + "-"
    + date.getDate() + " at " + date.getHours() + ":" + date.getMinutes();
}

const CommentItem = ({card, comment}) => {

    const dispatch = useDispatch();
    const board = useSelector(state => state.board.board);

    const onDelete = async () => {
        const result = await dispatch(deleteComment({boardId: board.board_id, comment_id: comment.comment_id}));

        if (result.success) await dispatch(getCard({boardId: board.board_id, card_id: card.card_id}));
        else console.log('can not delete comment');
    }

    return (
        <Container>
            <Header>
                <FontAwesomeIcon icon={faUserCircle} size='xs'
                    style={{color: '#949996', left: '-40px', position: 'absolute', padding: '0px 0 0 10px', fontSize: '20px'}} />  
                <b>{comment.member.username}</b> &nbsp;&nbsp; {convertDateClientTimezone(comment.create_time)}
            </Header>
            <ContentContainer>
                <ContentWrapper>
                    {
                        // new line을 출력하기 위한 기능
                        comment.contents && comment.contents.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))
                    }
                </ContentWrapper>
            </ContentContainer>
            <ControlContainer>
                <a href='/#' onClick={() => alert(comment.contents)}>Edit</a> &nbsp;&nbsp; 
                <a href='/#' onClick={() => onDelete()}>Delete</a>
            </ControlContainer>
        </Container>
    );
};

export default CommentItem;