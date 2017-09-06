import dispatcher from "../dispatcher.js";
import { USER } from "../constant/ActionConstants";

// Example Vanity URL: http://steamcommunity.com/id/bored154/
// Example Normal URL: http://steamcommunity.com/profiles/76561197977769301/
export function addUserBySteamURL(steamIdentifier) {
	if (steamIdentifier.includes("://steamcommunity.com")) {
		var re = /(id|profiles)\/(.+)\/$/
		steamIdentifier = re.exec(steamIdentifier)[2]
	}

	if(parseInt(steamIdentifier, 10)) {
		dispatcher.dispatch({
			type: USER.ADD_BY.ID,
			data: steamIdentifier
		});
	} else {
		dispatcher.dispatch({
			type: USER.ADD_BY.VANITY,
			data: steamIdentifier
		});
	}
}

export function addFriendsGames(steamid) {
	if (!parseInt(steamid, 10)) {
		console.error("addUserGames received non-int arg:", steamid);
		return;
	}

	dispatcher.dispatch({
		type: USER.ADD_FRIENDS_GAMES,
		data: steamid
	});
}
