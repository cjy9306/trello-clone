import React, { useEffect } from 'react';
import styled from 'styled-components/macro'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddCard from './AddCard';
import ListTitle from './ListTitle';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { createCard, getBoard } from '../../modules/board';


const ListContainer = styled.div`
    width: 272px;
    margin: 0 4px;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    &:last-child {
        margin-right: 16px;
    }
`;

const ListWrapper = styled.div`
    margin: 8px 0 8px 8px;
    width: 260px;
    background-color: #ebecf0;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`;

const CardList = styled.div`
    padding: 0 8px 0 8px;
    background-color: #ebecf0;
    flex-grow: 1;
    border-radius: 3px;
    min-height: 100px;
    margin-bottom: 4px;
`;


const List = ({list, index, board}) => {

    const dispatch = useDispatch();

    const onCreateCard = async (newCardName) => {
        const token = sessionStorage.getItem('token');
        const data = {
            card_name: newCardName,
            seq: list.cards.length,
        }

        const result = await dispatch(createCard({token, boardId: board.board_id, list_id: list.list_id, data}));

        if (result.success === true) {
            dispatch(getBoard({token, boardId: board.board_id}))
            return true;
        } else {
            console.log('create card fail')
            // error alert
            return false;
        }
    };

    return (
        <Draggable draggableId={'list-' + list.list_id} index={index} >
            {(provided) => (
                <ListContainer {...provided.draggableProps} ref={provided.innerRef}>
                    <ListWrapper>
                        <div {...provided.dragHandleProps}>
                            <ListTitle {...provided.dragHandleProps} >{list.list_name}</ListTitle>
                        </div>
                        <Droppable droppableId={'list-' + list.list_id} type="card">
                            {(provided, snapshot) => (
                                <CardList ref={provided.innerRef} {...provided.droppableProps} >
                                    {list.cards.map((card, index) => <Card key={card.card_id} card={card} list={list} board={board} index={index} />)}
                                    {provided.placeholder}
                                </CardList>
                            )}
                        </Droppable>
                        <AddCard onCreateCard={onCreateCard} />
                    </ListWrapper>
                </ListContainer>
            )}
        </Draggable>
    );
};

export default React.memo(List);