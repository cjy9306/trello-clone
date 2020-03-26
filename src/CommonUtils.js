exports.convertDateClientTimezone = time => {
	const tmpDate = new Date(time);
	const date = new Date(tmpDate.getTime() + tmpDate.getTimezoneOffset() * 60);

	return (
		date.getFullYear() +
		'-' +
		(date.getMonth() + 1) +
		'-' +
		date.getDate() +
		' at ' +
		date.getHours() +
		':' +
		date.getMinutes()
	);
};

exports.checkOverdueDate = date => {
	const current = new Date();
	const dueDate = new Date(date);
	if (current > dueDate) {
		return true;
	} else {
		return false;
	}
};

// [id, color, defaultSelected]
exports.BoardColorArray = [
	[0, '4BBF6B', true],
	[1, '00a5c3', false],
	[2, '006eb3', false],
	[3, 'ce8437', false],
	[4, '778186', false],
	[5, 'a93b2e', false]
];
