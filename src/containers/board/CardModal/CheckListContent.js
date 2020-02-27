import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CheckList from './CheckList';
import { useSelector } from 'react-redux';


const Container = styled.div`
    margin: 8px 0 40px 40px;
    position: relative;
    font-size: 20px;
    display: ${props => props.visible ? 'block' : 'none'};
`;


const CheckListContent = ({card}) => {
    const checklist = useSelector(state => state.board.cardChecklist);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (checklist && checklist.length > 0)
            setVisible(true);
        else
            setVisible(false);
    }, [checklist]);

    return (
        <Container visible={visible}>
            { 
                checklist && checklist.length > 0 && 
                checklist.map(checklist => <CheckList checklist={checklist} key={checklist.checklist_id}/>)
            }
        </Container>
    );
};

export default React.memo(CheckListContent);
