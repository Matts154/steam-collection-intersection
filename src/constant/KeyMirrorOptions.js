export default {
	connChar: "_",
	custFunc: function(key, value) { // Example
		if (typeof(value) === "string") {
			key = key + this.connChar + value;
		} else if (typeof(value) === "function") {
			key = value();
		}

		return key;
	}
}
