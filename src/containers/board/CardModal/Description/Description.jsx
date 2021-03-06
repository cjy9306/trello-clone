import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import DescriptionContent from './DescriptionContent';

const DescriptionContainer = styled.div`
	font-size: 20px;
	min-height: 32px;
	position: relative;

	@media only screen and (min-width: 669px) {
		margin: 8px 0 24px 40px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		margin: 8px 0 24px 8px;
	}
`;

const DescHeader = styled.div`
	display: flex;
	min-height: 32px;
	margin: 0 0 4px 0;
	padding: 8px 0;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 20px;
	position: absolute;
	padding: 2px 0 0 10px;

	@media only screen and (min-width: 669px) {
		left: -40px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		left: 0px;
		position: relative;
		padding-left: 0;
		margin-right: 8px;
	}
`;

/*
 *	Card의 Description 컴포넌트
 *
 */
const Description = ({ card }) => {
	return (
		<DescriptionContainer>
			<DescHeader>
				<CustomIcon icon={faAlignLeft} size="xs" />
				Description <br />
			</DescHeader>
			<DescriptionContent card={card} />
		</DescriptionContainer>
	);
};

Description.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(Description);
