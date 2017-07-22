import keyMirror from 'key-mirror-nested';

const constants = {
	USER: {
		FETCHING: null,
		RECEIVED: null,
		STORE_CHANGED: null,
		ERROR: {
			INVALID_STEAM_URL: null,
			INVALID_STEAM_ID: null,
		}
	},
	GAME: {
		FETCHING: null,
		RECEIVED: null,
		ERROR: null,
		STORE_CHANGED: null,
	}
}


export default keyMirror(constants);
