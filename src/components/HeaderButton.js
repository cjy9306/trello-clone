import React from 'react';
import styled from 'styled-components/macro';


const ButtonContainer = styled.button`
    background-color: hsla(0,0%,100%,.24);
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    color: #fff;
`;

const HeaderButton = ({className, style, children, onClick}) => {


    return (
        <ButtonContainer className={className} style={style} onClick={onClick}>
            {children}
        </ButtonContainer>
    )
};

export default React.memo(HeaderButton);