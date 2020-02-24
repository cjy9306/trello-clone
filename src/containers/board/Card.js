import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Draggable } from 'react-beautiful-dnd';
import { changeModalVisible, getCard, setCardModal } from '../../modules/board';
import Tag from '../../components/Tag';

const CardContainer = styled.div`
    border: 1px lightgrey;
    border-radius: 3px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: #fff;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    word-wrap: break-word;
    overflow: hidden;
`;

const CardContent = styled.div`
    cursor: pointer;
    word-wrap: break-word;
`;

const CardLabels = styled.div`
    overflow: auto;
    position: relative;
`;

const LabelWrapper = styled.span`
    float: left;
    min-width: 20px;
    width: auto;
    min-height: 8px;
    margin: 0 4px 4px 0;
    border-radius: 4px;
`;

const getStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    return {
        ...style,
        transitionDuration: '0.001s',
    }
}

const Card = ({card, board, index}) => {

    const dispatch = useDispatch();
    const savedCard = useSelector(state => state.board.card);

    const onShowModal = async () => {
        if (savedCard && savedCard.card_id === card.card_id) {
            dispatch(changeModalVisible(true));
        } else {
            // dispatch(setCardModal(card));
            const token = sessionStorage.getItem('token');
            const result = await dispatch(getCard({token, board_id: board.board_id, card_id: card.card_id}));
            if (result.success === true) {
                dispatch(changeModalVisible(true));
            }
        }
    };

    return (
        <Draggable draggableId={'card-' + card.card_id} index={index} >
            {(provided, snapshot) => (
                <CardContainer 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                >
                    <CardContent onClick={onShowModal}>
                        <CardLabels>
                        {
                            card.labels && 
                            card.labels.map(label => 
                                <LabelWrapper key={label.label_id}>
                                    <Tag size='default' color={`#${label.color}`}>{label.label_name}</Tag>
                                </LabelWrapper>
                            )
                        }
                        </CardLabels>
                        {card.card_name}<br /> 
                    </CardContent>
                    
                </CardContainer>
            )}
        </Draggable>
    );
};

export default React.memo(Card);