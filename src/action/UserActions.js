import { dispatcher } from "../dispatcher.js";
import { USER } from "../constant/ActionConstants";

// Example Vanity URL: http://steamcommunity.com/id/bored154/
// Example Normal URL: http://steamcommunity.com/profiles/76561197977769301/
function addUserBySteamURL(steamIdentifier) {
	if (steamIdentifier.includes("://steamcommunity.com")) {
		var re = /(id|profile)\/(.+)\/$/
		steamIdentifier = re.exec(steamIdentifier)[2]
	}

	if(Number.parseInteger(steamIdentifier)) {
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
