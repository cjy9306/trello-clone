import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import Description from './Description';

const Container = styled.div`
    margin: 8px 0 24px 40px;
    position: relative;
    font-size: 20px;
    min-height: 32px;
`;

const DescHeader = styled.div`
    display: flex;
    min-height: 32px;
    margin: 0 0 4px 0;
    padding: 8px 0;
`;

const IconStyle = {
    left: '-40px',
    position: 'absolute',
    padding: '2px 0 0 10px',
    fontSize: '20px',
}

const DescriptionContent = ({card}) => {
    return (
        <Container>
            <DescHeader>
                <FontAwesomeIcon icon={faAlignLeft} size='xs' style={IconStyle} />
                Description <br/>
            </DescHeader>
            <Description card={card} />
        </Container>
    );
};

export default React.memo(DescriptionContent);