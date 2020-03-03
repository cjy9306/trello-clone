import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import GlobalHeader from '../../components/GlobalHeader';
import useCheckWhetherIsLogined from '../../components/useCheckWhetherIsLogined';
import useInput from '../../components/useInput';
import Button from '../../components/Button';
import { ConfirmModal } from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { getTeam, deleteTeam, addTeamMember, deleteTeamMember } from '../../modules/team';
import MemberListItem from '../../components/MemberListItem';

const Container = styled.div`

`;

const SettingsHeader = styled.div`
    background-color: #f4f5f7;
`;

const TeamInfoContent = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 48px 32px 24px 32px;
`;

const TeamInfoTitle = styled.div`
    font-size: 32px;
    padding-left: 12px;
    margin-bottom: 28px;
`;

const TeamInfoDescription = styled.div`
    margin-bottom: 28px;
`;

const LabelWrapper = styled.div`
    background-color: rgba(9,30,66,.04);
    box-shadow:none;
    border: none;
    border-radius: 3px;
    display: ${props => props.isEditting ? 'none' : 'block'};
    min-height: 40px;
    padding: 8px 12px;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: rgba(9, 30, 66, .09);
    }
`;

const TextAreaWrapper = styled.div`
    display: ${props => props.isEditting ? 'block' : 'none'};
    width: 100%;
`;

const TextAreaField = styled.textarea`
    width: 100%;
    border: none;
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;
    height: 108px;
    min-height: 108px;
    background: #fff;
    box-shadow: none;
    padding: 8px 12px;
    box-sizing: border-box;
    border-radius: 3px;
    font-size: 14px;
`;

const ControlWrapper = styled.div`
    
`;

const SettingsContent = styled.div`

`;

const MembersContent = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 16px 32px;
`;

const MembersHeader = styled.div`

`;

const MembersInput = styled.div`
    margin-bottom: 16px;
`;

const MembersList = styled.div`

`;

const CustomIcon = styled(FontAwesomeIcon)`
    font-size: 32px;
    margin-right: 16px;
`;

const TitleWrapper = styled.div`
    height: 32px;
    line-height: 32px;
    margin-bottom: 8px;
    padding-left: 4px;
`;

const EmailInput = styled.input`
    height: 32px;
    width: 40%;
    background-color: #fafbfc;
    border: none;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 8px 12px;
    font-size: 14px;
`;

const TeamSettingsContainer = ({match}) => {
    const teamId = match.params.teamId;
    const isLogined = useCheckWhetherIsLogined();
    const dispatch = useDispatch();
    const history = useHistory();

    const team = useSelector(state => state.team.team);
    const teamMembers = useSelector(state => state.team.teamMembers);
    
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [isEditting, setIsEditting] = useState(false);
    const [description, onChangeDescription, setDescription] = useInput('');
    const [email, onChangeEmail] = useInput('');
    const editRef = useRef();

    const onLabelClick = () => setIsEditting(true);
    const onCancelClick = () => setIsEditting(false);

    const onShowTeamDeletMoal = () => setConfirmModalVisible(true);
    const onCloseTeamDeleteModal = () => setConfirmModalVisible(false);


    useEffect(() => {
        if (isEditting) editRef.current.focus();
    }, [isEditting]);

    useEffect(() => {
        getTeamInfo();
    }, [match]);

    const getTeamInfo = async () => {
        const result = await dispatch(getTeam({teamId}));

        if (!result.success) {
            const memberId = sessionStorage.getItem('memberId');
            alert('can not find this team');
            history.push('/member/' + memberId + '/boards');
        }
    };

    const onAddMember = async () => {
        const data = { email };
        const result = await dispatch(addTeamMember({teamId, data}));

        if (result.success) {
            getTeam();
        } else {
            console.log('delete member fail')
        }
    };

    const onMemberDeleteClick = async (memberId) => {
        const result = await dispatch(deleteTeamMember({teamId, memberId}));

        if (result.success) {
            dispatch(getTeam({teamId}));
        } else {
            console.log('delete member fail')
        }
    }

    const onTeamDeleteOk = async () => {
        const result = await dispatch(deleteTeam({teamId}));

        if (result.success) {
            const memberId = sessionStorage.getItem('memberId');
            history.push('/member/' + memberId + '/boards');
        } else {
            console.log('delete team fail');
        }
    };

    return (
        <>
            <GlobalHeader isLogined={isLogined} backgroundColor={'#026aa7'} />
            <Container>
                <SettingsHeader>
                    <TeamInfoContent>
                        <TeamInfoTitle>
                            <CustomIcon icon={faUserFriends} size='xs'/>
                            {team && team.team_name}
                        </TeamInfoTitle>
                        <TeamInfoDescription>
                            <LabelWrapper isEditting={isEditting} onClick={onLabelClick} >
                                {
                                    description === '' || description == null ? 'Add a more detailed description...' : 
                                    team.description && team.description.split('\n').map((line, index) => 
                                        (<span key={index}>{line}<br/></span>))
                                }
                            </LabelWrapper>
                            <TextAreaWrapper isEditting={isEditting} >
                                <TextAreaField value={description} placeholder={description == null || description === '' ? 'Add a more detailed description...' : ''} 
                                                ref={editRef} onChange={onChangeDescription}/>
                                <ControlWrapper>
                                    <Button type='primary' >Save</Button> &nbsp;
                                    <Button type='default' onClick={onCancelClick} >Cancel</Button>
                                </ControlWrapper>
                            </TextAreaWrapper>
                        </TeamInfoDescription>
                        <ConfirmModal 
                            visible={confirmModalVisible} 
                            message='Are you sure delete this team?' 
                            onCloseModal={onCloseTeamDeleteModal}
                            onClickOk={onTeamDeleteOk}
                            />
                        <Button type='danger' onClick={onShowTeamDeletMoal}>Delete this team</Button>
                    </TeamInfoContent>
                </SettingsHeader>
                <SettingsContent>
                    <MembersContent>
                        <MembersHeader>
                            <TitleWrapper>Invite member</TitleWrapper>
                        </MembersHeader>
                        <MembersInput>
                            <EmailInput value={email} onChange={onChangeEmail} placeholder='input member email' /> &nbsp;
                            <Button type='primary' onClick={onAddMember}>Add</Button> &nbsp;
                        </MembersInput>
                        <MembersList>
                            <TitleWrapper>Members</TitleWrapper>
                            {
                                teamMembers &&
                                teamMembers.map(member => 
                                    <MemberListItem member={member} onDeleteClick={onMemberDeleteClick} key={member.member_id}/>)
                            }
                        </MembersList>
                    </MembersContent>
                </SettingsContent>
            </Container>
        </>
    );
};

export default React.memo(TeamSettingsContainer);