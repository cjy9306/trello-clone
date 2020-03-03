import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import SideBarCheckList from './SideBarCheckList';
import SideBarLabels from './SideBarLabels';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckList, getCheckList } from '../../../modules/board'
import { LinkButton } from '../../../components/Button';

const SideBarHeader = styled.div`
    font-size: 16px;
    margin-bottom: 16px;
`;

const SideBarContent = styled.div`
    font-size: 16px;
`;

const LinkButtonStyle = {
    margin: '0 16px 8px 0',
};

const PopupOver = styled.div`
    display: ${props => props.visible ? 'block' : 'none'};
    position: absolute;
    right: auto;
    margin: 0px 0 0 0px;
    width: 300px;
    min-height: 170px;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    z-index: 10 ;
`;

const CloseSpan = styled.span`
    color: #aaaaaa;
    float: right;
    font-size: 20px;
    font-weight: bold;
    margin-right: 8px;
    &:hover, &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

const LinkButtonWrapper = styled(LinkButton)`
    margin-bottom: 8px;
`;

const SideBar = ({card}) => {

    const dispatch = useDispatch();
    const board = useSelector(state => state.board.board);
    const cardModalVisible = useSelector(state => state.board.cardModalVisible);

    const [membersPopupVisible, setMembersPopupVisible] = useState(false);
    const [labelPopupVisible, setLabelPopupVisible] = useState(false);
    const [checkListPopupVisible, setCheckListPopupVisible] = useState(false);

    const onMembersPopupToggle = () => setMembersPopupVisible(!membersPopupVisible);
    const onLabelPopupToggle = () => setLabelPopupVisible(!labelPopupVisible);
    const onCheckListPopupToggle = () => setCheckListPopupVisible(!checkListPopupVisible);

    const onCreateCheckList = async (itemName) => {
        const data = {
            checklist_name: itemName,
        };
        const result = await dispatch(createCheckList({boardId: board.board_id, card_id: card.card_id, data}));

        if (result.success) {
            await dispatch(getCheckList({boardId: board.board_id, card_id: card.card_id}));
            onCheckListPopupToggle();
        }
    };

    useEffect(() => {
        setMembersPopupVisible(false);
        setLabelPopupVisible(false);
        setCheckListPopupVisible(false);
    }, [cardModalVisible]);

    return (
        <>
            <SideBarHeader>
                ADD TO CARD
            </SideBarHeader>
            <SideBarContent>
                <LinkButtonWrapper size='large' onClick={onMembersPopupToggle} style={LinkButtonStyle}>
                    Members 
                </LinkButtonWrapper>
                <PopupOver visible={membersPopupVisible} >
                    Popup over
                    <CloseSpan onClick={onMembersPopupToggle}>&times;</CloseSpan>
                </PopupOver>
                <LinkButtonWrapper size='large' onClick={onLabelPopupToggle} style={LinkButtonStyle}>
                    Labels
                </LinkButtonWrapper>
                <PopupOver visible={labelPopupVisible}>
                    <SideBarLabels onPopupToggle={onLabelPopupToggle} card={card}/>
                </PopupOver>
                <LinkButtonWrapper size='large' onClick={onCheckListPopupToggle} style={LinkButtonStyle}>
                    Check List
                </LinkButtonWrapper>
                <PopupOver visible={checkListPopupVisible} >
                    <SideBarCheckList onPopupToggle={onCheckListPopupToggle} onCreateCheckList={onCreateCheckList}/>
                </PopupOver>
            </SideBarContent>
        </>
    );
};

export default React.memo(SideBar);