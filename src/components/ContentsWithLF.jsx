import React from 'react';
import PropTypes from 'prop-types';

const ContentsWithLF = (string) => {
	if (string) {
		return string.split('\n').map((line, index) => (
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
	string: PropTypes.string.isRequired,
};

export default React.memo(ContentsWithLF);
