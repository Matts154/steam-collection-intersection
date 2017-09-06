import keyMirror from 'key-mirror-nested';
import * as options from "./KeyMirrorOptions.js";

let keys = keyMirror({
	USER: {
		FETCHING: null,
		RECEIVED: null,
		DONE: null,
		STORE_CHANGED: null,
		ERROR: null
	},
	SELECTED_FRIENDS: {
		ADDED: null,
		REMOVED: null,
		ERROR: null
	}
}, options);

export let USER = keys.USER;
export let SELECTED_FRIENDS = keys.SELECTED_FRIENDS;
