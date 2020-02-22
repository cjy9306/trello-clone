import React from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro';
import Header from './Header';
import Modal from '../../../components/Modal';
import DetailsContent from './DetailsContent';
import CheckListContent from './CheckListContent';
import CommentContent from './CommentContent';
import SideBar from './SideBar';
import DescriptionContent from './DescriptionContent';

const MainContent = styled.div`
    float: left;
    width: 542px;
    padding: 0px 8px 8px 16px;
`;

const SideBarContent = styled.div`
    width: 188px;
    margin-top: 26px;
    float: right;
    padding: 0 8px 8px 0;
    overflow: hidden;
`;

const CardModalContainer = styled(Modal)`
    width: 768px;
    min-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
`;

// const ModalStyle = {
//     width: '768px',
//     minHeight: '400px',
//     overflowX: 'hidden',
//     overflowY: 'auto',
// }

const CardModal = ({visible, onCloseModal}) => {

    const card = useSelector(state => state.board.card);

    return (
        <CardModalContainer visible={visible} onCloseModal={onCloseModal}>
                <Header card={card}/>
                <MainContent>
                    <DetailsContent card={card} />
                    <DescriptionContent card={card} />
                    <CheckListContent card={card} />
                    <CommentContent card={card} />
                </MainContent>
                <SideBarContent>
                    <SideBar card={card} />
                </SideBarContent>
        </CardModalContainer>
    );
};

export default React.memo(CardModal);