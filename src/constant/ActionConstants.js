import keyMirror from 'key-mirror-nested';
import * as options from "./KeyMirrorOptions.js";

const keys = keyMirror({
	USER: {
		ADD_BY: {
			VANITY: null,
			ID: null
		},
		ADD_FRIENDS_GAMES: null,
		CLEAR: null
	},
	SELECTED_FRIENDS: {
		ADD: null,
		REMOVE: null,
		CLEAR: null
	}
}, options);

export let USER = keys.USER;
export let SELECTED_FRIENDS = keys.SELECTED_FRIENDS;
