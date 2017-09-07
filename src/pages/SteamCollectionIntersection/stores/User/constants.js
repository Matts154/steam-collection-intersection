import keyMirror from 'key-mirror-nested';
import * as options from "./KeyMirrorOptions.js";

const keys = keyMirror({
	ACTION: {
		ADD_BY: {
			VANITY: null,
			ID: null
		},
		ADD_SELECTED_FRIEND: null,
		REMOVE_SELECTED_FRIEND: null,
		CLEAR_STORE: null
	},
	EVENT: {
		FETCHING: null,
		RECEIVED: null,
		DONE: null,
		STORE_CHANGED: null,
		ERROR: null
	}
}, options);

export let ACTION = keys.ACTION;
export let EVENT = keys.EVENT;
