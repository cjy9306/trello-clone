import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 100px;
	line-height: 100px;
	width: 100%;
	text-align: center;

	@media only screen and (min-width: 401px) {
		font-size: 16px;
	}

	@media only screen and (max-width: 400px) {
		height: 50px;
		line-height: 50px;
		font-size: 12px;
	}
`;

const LoginFooter = () => {
	return <FooterContainer>본 사이트는 포트폴리용으로 제작된 Trello 클론 프로젝트 사이트입니다.</FooterContainer>;
};

export default React.memo(LoginFooter);
