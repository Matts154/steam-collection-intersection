import { getPlayerSummaries, resolveVanityName, getFriendList, getOwnedGames } from "../helpers/SteamAPI";
import dispatcher from "../dispatcher.js";
import { EventEmitter } from "events";
import { USER as ACTION } from "../constant/ActionConstants";
import { USER as EVENT } from "../constant/StoreConstants";

class UserStore extends EventEmitter {
	constructor() {
		super();
		this.store = {
			user: {},
			selectedFriends: [],
		}
	}

	getStore() {
		return this.store;
	}

	getUser() {
		return this.store.user;
	}

	getSelectedFriends() {
		return this.store.selectedFriends;
	}

	clearStore() {
		this.store = {};
		this.emit(EVENT.DONE);
	}

	resolveUserByVanity(vanityName) {
		this.emit(EVENT.FETCHING);
		Promise.resolve(resolveVanityName(vanityName))
			.then(data => this.resolveUserSummary(data.response.steamid))
			.then(() => this.resolveFriendsList())
			.then(() => this.resolveOwnedGames())
			.then(() => this.emit(EVENT.STORE_CHANGED))
			.then(() => this.emit(EVENT.DONE))
		    .catch((error) => {
		 	    console.error("Error getting user (vanity):", error);
			    this.emit(EVENT.ERROR);
		    });
	}

	resolveUserById(steamid) {
		this.emit(EVENT.FETCHING);
		Promise.resolve(this.resolveUserSummary(steamid))
			.then(() => this.resolveFriendsList())
			.then(() => this.resolveOwnedGames())
			.then(() => this.emit(EVENT.STORE_CHANGED))
			.then(() => this.emit(EVENT.DONE))
			.catch((error) => {
			   console.error("Error getting user (id):", error);
			   this.emit(EVENT.ERROR);
		   });
	}

	resolveUserSummary(steamid) {
		return getPlayerSummaries(steamid)
			.then(data => this.store.user = data.response.players[0])
	}

	resolveFriendsList() {
		return getFriendList(this.store.user.steamid)
			.then(data => this.store.user.friends = data.response.players)
	}

	resolveOwnedGames() {
			return getOwnedGames(this.store.user.steamid)
			.then(data => this.store.user.games = data.response.games)
	}

	addSelectedFriend(steamid) {
		const index = this.store.user.friends.findIndex(f => f.steamid === steamid);
		let friend = index < 0 ? null : this.store.user.friends[index];

		if (!friend) {
			console.error("Friend not found:", steamid)
			this.emit(EVENT.ERROR);
			return;
		}

		this.store.selectedFriends.push(steamid);

		if (!friend.games) {
			this.emit(EVENT.FETCHING);
			Promise.resolve(getOwnedGames(steamid))
				.then(data => friend.games = data.response.games)
				.then(() => this.emit(EVENT.STORE_CHANGED))
				.then(() => this.emit(EVENT.DONE));
		} else {
			this.emit(EVENT.DONE)
		}
	}

	removeSelectedFriend(steamid) {
		this.store.selectedFriends = this.store.selectedFriends.filter(id => id !== steamid);
		this.emit(EVENT.DONE);
	}

	handleEvent({ type, data }) {
		console.log("UserStore got action type:", type);
		switch(type) {
			case ACTION.ADD_BY.VANITY:
				this.resolveUserByVanity(data);
				break;
			case ACTION.ADD_BY.ID:
				this.resolveUserById(data);
				break;
			case ACTION.ADD_SELECTED_FRIEND:
				this.addSelectedFriend(data);
				break;
			case ACTION.REMOVE_SELECTED_FRIEND:
				this.removeSelectedFriend(data);
				break;
			default:
				console.warn("Unhandled event in UserStore:", type);
				break;
		}
	}

}

const store = new UserStore();

dispatcher.register(store.handleEvent.bind(store));

window.store = store;

export default store;
