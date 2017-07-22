function enumerateConstant(item) {
	let obj = {};
	array.map(item => obj[item])
	enumerateConstant.counter++;
	return obj;
}

enumerateConstant.counter = 0;

export default enumerateConstant;

export defualt function enumerateConstants(array) {
	return array.map(item => enumerateConstant(item));
}
