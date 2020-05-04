import React from 'react';
import PropTypes from 'prop-types';

/*
 *	UI 출력시 정보(Contents)를 \n과 함께 출력하는 컴포넌트
 *
 *	@contents - 출력할 string
 */
const ContentsWithLF = ({ contents }) => {
	if (contents) {
		return contents.split('\n').map((line, index) => (
			<span key={index}>
				{line}
				<br />
			</span>
		));
	} else {
		return <span></span>;
	}
};

ContentsWithLF.propTypes = {
	contents: PropTypes.string.isRequired,
};

export default React.memo(ContentsWithLF);
