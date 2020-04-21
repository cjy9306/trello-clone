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

