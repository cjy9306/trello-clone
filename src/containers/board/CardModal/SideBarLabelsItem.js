import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

const SideBarLabelsItemContainer = styled.div`
    position: relative;
`;

const SideBarLabelsItemContent = styled.div`
    width: 182px;
    min-height: 20px;
    padding: 6px 32px 6px 12px;
    background-color: ${props => props.color ? props.color : 'grey'};
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 3px;
    font-weight: 400;
    font-size: 16px;
    position: relative;
    margin-bottom: 4px;
    color: white;
`;

const SideBarLabelItemCheck = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: ${props => props.checked ? 'block' : 'none'};
`;

const EditIconStyle = {
    right: '0',
    top: '0',
    padding: '8px',
    position: 'absolute',
    borderRadidus: '3px',
    fontSize: '16px',
    cursor: 'pointer',
};

const CheckIconStyle = {
    top: '0',
    right: '0',
    padding: '8px',
    position: 'absolute',
    fontSize: '16px',
    cursor: 'pointer',
}

const SideBarLabelsItem = ({label, defaultChecked, onLabelsItemClick}) => {

    const [checked, setChecked] = useState(false);

    const onItemClick = () => {
        const result = !checked;
        setChecked(result);
        onLabelsItemClick(label.label_id, result);
    }

    useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked])

    return (
        <SideBarLabelsItemContainer>
            <FontAwesomeIcon icon={faPen} size='xs' style={EditIconStyle} />  
            <SideBarLabelsItemContent color={`#${label.color}`} onClick={onItemClick} >
                {label.label_name}
                <SideBarLabelItemCheck checked={checked}>
                    <FontAwesomeIcon icon={faCheck} size='xs' style={CheckIconStyle} />  
                </SideBarLabelItemCheck>
            </SideBarLabelsItemContent>
        </SideBarLabelsItemContainer>
    );

};

export default React.memo(SideBarLabelsItem);