import { EventEmitter } from "events";
import * from "../helpers/FetchHelpers";

class UserStore extends EventEmitter {
	constructor() {
		this.users = {};
	}

	// Example Vanity URL: http://steamcommunity.com/id/bored154/
	// Example Normal URL: http://steamcommunity.com/profiles/76561197977769301/
	function addUserBySteamURL(steamurl) {
		let steamIdentifier = steamurl;
		if (steamIdentifier.includes("://steamcommunity.com")) {
			var re = /(id|profile)\/(.+)\/$/
			steamIdentifier = re.exec(steamurl)[2]
		}

		dispatcher.dispatch({
			type: Constants.USER.FETCHING,
		});

		if(Number.parseInteger(steamIdentifier)) {
			fetchUserSummaries(steamIdentifier);
		} else {
			resolveVanityName(steamIdentifier);
		}

	}

	function resolveVanityName(steamName) {
		fetch(`https://steam-api-proxy.herokuapp.com/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${steamName}`)
		.then(this.checkStatus)
		.then(this.getJSON)
		.then(data => fetchUserSummaries(data.response.steamid))
		.catch(error => dispatcher.dispatch({
			type: Constants.USER.ERROR,
			error
		}));
	}

	function addFriends(steamid) {
		fetch(`https://steam-api-proxy.herokuapp.com/ISteamUser/GetFriendList/v0001/?steamid=${steamid}&relationship=friend`)
		.then(this.checkStatus)
		.then(this.getJSON)
		.then(data => data.friendslist.friends.map(friend => friend.steamid))
		.then(steamids => fetchUserSummaries(steamids))
		.catch(error => dispatcher.dispatch({
			type: Constants.USER.ERROR,
			error
		}));
	}

	function fetchUserSummaries(users) {
		fetch(`https://steam-api-proxy.herokuapp.com/ISteamUser/GetPlayerSummaries/v0002/?steamids=${users.toString()}`)
		.then(this.checkStatus)
		.then(this.getJSON)
		.then(data => dispatcher.dispatch({
			type: Constants.USER.RECEIVED,
			data: data.response.players
		})
		.catch(error => dispatcher.dispatch({
			type: Constants.USER.ERROR,
			error
		}));
	}

}

let store = new UserStore;
store.on()

export default store;
