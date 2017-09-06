import dispatcher from "../dispatcher.js";
import { SELECTED_FRIENDS as ACTION } from "../constant/ActionConstants";

function isInteger(num) {
	return !isNaN(parseInt(num, 10));
}

export function add(steamid) {
	if (!isInteger(steamid)) {
		console.error("addFriend received non-int arg:", steamid);
		return;
	}

	dispatcher.dispatch({
		type: ACTION.ADD,
		data: steamid
	});
}

export function remove(steamid) {
	if (!isInteger(steamid)) {
		console.error("removeFriend received non-int arg:", steamid);
		return;
	}

	dispatcher.dispatch({
		type: ACTION.REMOVE,
		data: steamid
	});
}

export function clear() {
	dispatcher.dispatch({
		type: ACTION.CLEAR,
	});
}
