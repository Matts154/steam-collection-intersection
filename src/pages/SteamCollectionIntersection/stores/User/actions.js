import dispatcher from "../helpers/dispatcher.js";
import { ACTION } from "./constants";

function isInteger(num) {
	return !isNaN(parseInt(num, 10));
}

// Example Vanity URL: http://steamcommunity.com/id/bored154/
// Example Normal URL: http://steamcommunity.com/profiles/76561197977769301/
export function addUserBySteamURL(steamIdentifier) {
	if (steamIdentifier.includes("://steamcommunity.com")) {
		var re = /(id|profiles)\/(.+)\/$/
		steamIdentifier = re.exec(steamIdentifier)[2]
	}

	if(parseInt(steamIdentifier, 10)) {
		dispatcher.dispatch({
			type: ACTION.ADD_BY.ID,
			data: steamIdentifier
		});
	} else {
		dispatcher.dispatch({
			type: ACTION.ADD_BY.VANITY,
			data: steamIdentifier
		});
	}
}

export function addSelectedFriend(steamid) {
	if (!isInteger(steamid)) {
		console.error("addUserGames received non-int arg:", steamid);
		return;
	}

	dispatcher.dispatch({
		type: ACTION.ADD_SELECTED_FRIEND,
		data: steamid
	});
}

export function removeSelectedFriend(steamid) {
	if (!isInteger(steamid)) {
		console.error("removeFriend received non-int arg:", steamid);
		return;
	}

	dispatcher.dispatch({
		type: ACTION.REMOVE_SELECTED_FRIEND,
		data: steamid
	});
}

export function clearStore() {
	dispatcher.dispatch({
		type: ACTION.CLEAR_STORE,
	});
}
