import { getPlayerSummaries, resolveVanityName, getFriendList, getOwnedGames } from "../helpers/SteamAPI";
import dispatcher from "../dispatcher.js";
import { EventEmitter } from "events";
import { USER as ACTION } from "../constant/ActionConstants";
import { USER as EVENT } from "../constant/StoreConstants";

class UserStore extends EventEmitter {
	constructor() {
		super();
		this.user = {};
	}

	getUser() {
		return this.user;
	}

	clearStore() {
		this.user = {};
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
			.then(data => this.user = data.response.players[0])
	}

	resolveFriendsList() {
		return getFriendList(this.user.steamid)
			.then(data => this.user.friends = data.response.players)
	}

	resolveOwnedGames() {
			return getOwnedGames(this.user.steamid)
			.then(data => this.user.games = data.response.games)
	}

	resolveFriendsGames(steamid) {
		const index = this.user.friends.findIndex(f => f.steamid === steamid);
		let friend = index < 0 ? null : this.user.friends[index];

		if (!friend) {
			console.error("Friend not found:", steamid)
			this.emit(EVENT.ERROR);
			return;
		}

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

	handleEvent({ type, data }) {
		console.log("UserStore got action type:", type);
		switch(type) {
			case ACTION.ADD_BY.VANITY:
				this.resolveUserByVanity(data);
				break;
			case ACTION.ADD_BY.ID:
				this.resolveUserById(data);
				break;
			case ACTION.ADD_FRIENDS_GAMES:
				this.resolveFriendsGames(data);
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
