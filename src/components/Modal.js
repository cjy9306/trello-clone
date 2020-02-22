import React from 'react';
import styled from 'styled-components/macro';

const ModalContainer = styled.div`
    display: ${props => props.visible ? 'flex' : 'none'}; 
    align-items: flex-start;
    align-content: space-between;
    justify-content: center;
    position: fixed; 
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow-y: auto; 
    background-color: rgba(0,0,0,0.4); 
`;

const ModalContent = styled.div`
    background-color: #f4f5f7;
    margin: 48px auto 80px;
    border-radius: 3px;
    color: #000;
`;

const CloseSpan = styled.span`
    color: #aaaaaa;
    float: right;
    margin: 8px 12px 0 0;
    font-size: 24px;
    font-weight: bold;
    &:hover, &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

const Modal = ({className, visible = false, onCloseModal, children}) => {
    console.log('inModal visible ; ' + visible)
    return (
        <ModalContainer visible={visible}>
            <ModalContent className={className} >
                <CloseSpan onClick={onCloseModal}>&times;</CloseSpan>
                {children}
            </ModalContent>
        </ModalContainer>
    )

};

export default React.memo(Modal)