import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import Tag from '../../../components/Tag';
import DatePicker from "react-datepicker";
import Alert from '../../../components/Alert';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateCardDueDate, getCard } from '../../../modules/board';

const Container = styled.div`
    margin: 8px 0 24px 40px;
    display: ${props => props.visible}
`;

const LabelsContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
    overflow: auto;
    display: ${props => props.visible ? 'block' : 'none'};
`;

const LabelWrapper = styled.span`
    float: left;
    min-width: 20px;
    width: auto;
    min-height: 8px;
    margin: 0 4px 4px 0;
    border-radius: 4px;
`;

const DueDateContainer = styled.div`
    font-size: 14px;
    margin-bottom: 20px;
`;

const CustomPicker = styled(DatePicker)`
    padding: 4px 8px 4px 8px;
    height: 32px;
    font-size: 16px;
    border-radius: 3px;
    margin-top: 8px;
`;

const checkOverdue = (date) => {
    const current = new Date();
    const dueDate = new Date(date);
    if (current > dueDate) {
        return true;
    } else {
        return false;
    }
};

const DetailsContent = ({card}) => {
    const [dueDate, setDueDate] = useState('');
    const [overdueVisible, setOverdueVisible] = useState(false);

    const dispatch = useDispatch();
    const board = useSelector(state => state.board.board);

    const onChangeDueDate = async (selected) => {
        const token = sessionStorage.getItem('token');
        const data = { due_date: selected }

        const result = await dispatch(updateCardDueDate({token, boardId: board.board_id, card_id: card.card_id, data}));

        if (result.success) {
            dispatch(getCard({token, boardId: board.board_id, card_id: card.card_id}));
        } else {
        }
    }

    useEffect(() => {
        if (card.due_date) {
            setDueDate(new Date(card.due_date))
            
            if (checkOverdue(card.due_date))
                setOverdueVisible(true);
            else
                setOverdueVisible(false);
        } else {
            setDueDate(null);
            setOverdueVisible(false);
        }
    }, [card])

    return (
        <Container>
            <LabelsContainer visible={card.labels ? true : false}>
                {
                    card.labels &&
                    card.labels.map(label => 
                        <LabelWrapper color={label.color} key={label.label_id}>
                            <Tag size='large' color={`#${label.color}`}>{label.label_name}</Tag>
                        </LabelWrapper>
                    )
                }
            </LabelsContainer>
            <DueDateContainer>
                DUE DATE<br />
                <CustomPicker selected={dueDate} onChange={onChangeDueDate} />&nbsp;
                <Alert type='error' message='OVERDUE' visible={overdueVisible} />
            </DueDateContainer>
        </Container>
    );
};

export default React.memo(DetailsContent);