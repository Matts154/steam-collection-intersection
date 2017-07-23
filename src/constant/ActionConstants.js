import keyMirror from 'key-mirror-nested';

const constants = {
	USER: {
		ADD_BY: {
			VANITY: null,
			ID: null
		},
		CLEAR: null
	},
	GAME: {
		ADD: null,
		CLEAR: null
	}
}


export default keyMirror(constants);
