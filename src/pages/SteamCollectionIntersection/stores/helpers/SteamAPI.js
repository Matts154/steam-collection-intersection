import { checkStatus, getJSON } from "../helpers/FetchHelpers";

const BASEURL = "https://steam-api-proxy.herokuapp.com";

function resolveRequest(uri) {
	return fetch(`${BASEURL}${uri}`)
	.then(checkStatus)
	.then(getJSON)
	.catch(error => console.error(error));
}

export function resolveVanityName(steamName) {
	return resolveRequest(`/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${steamName}`)
}

export function getFriendList(steamid) {
	return resolveRequest(`/ISteamUser/GetFriendList/v0001/?steamid=${steamid}&relationship=friend`)
	.then(data => data.friendslist.friends.map(friend => friend.steamid))
	.then(steamids => getPlayerSummaries(steamids))
}

export function getPlayerSummaries(users) {
	return resolveRequest(`/ISteamUser/GetPlayerSummaries/v0002/?steamids=${users.toString()}`)
}

export function getOwnedGames(steamid) {
	return resolveRequest(`/IPlayerService/GetOwnedGames/v0001/?steamid=${steamid}&include_appinfo=1&include_played_free_games=1&format=json`)
}
