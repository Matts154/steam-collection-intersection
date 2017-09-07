import keyMirror from 'key-mirror-nested';
import * as options from "./KeyMirrorOptions.js";

const keys = keyMirror({
	USER: {
		ADD_BY: {
			VANITY: null,
			ID: null
		},
		ADD_SELECTED_FRIEND: null,
		REMOVE_SELECTED_FRIEND: null,
		CLEAR_STORE: null
	}
}, options);

export let USER = keys.USER;
