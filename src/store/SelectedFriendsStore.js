import dispatcher from "../dispatcher.js";
import { EventEmitter } from "events";
import { SELECTED_FRIENDS as ACTION,  USER as TEST  } from "../constant/ActionConstants";
import { SELECTED_FRIENDS as EVENT } from "../constant/StoreConstants";

class SelectedFriendsStore extends EventEmitter {
	constructor() {
		super();
		this.selectedFriends = [];
	}

	getFriends() {
		return this.selectedFriends;
	}

	addFriend(steamid) {
		this.selectedFriends.push(steamid);
		this.emit(EVENT.ADDED);
	}

	removeFriend(steamid) {
		this.selectedFriends = this.selectedFriends.filter(id => id !== steamid);
		this.emit(EVENT.REMOVED);
	}

	clearFriends() {
		this.selectedFriends = [];
		this.emit(EVENT.REMOVED);
	}

	handleEvent({ type, data }) {
		console.log("SelectedFriendsStore got action type:", type);
		switch(type) {
			case TEST.ADD_FRIENDS_GAMES:
				this.addFriend(data);
				break;
			case ACTION.REMOVE:
				this.removeFriend(data);
				break;
			case ACTION.CLEAR:
				this.clearFriends(data);
				break;
			default:
				console.warn("Unhandled event in SelectedFriendsStore:", type);
				break;
		}
	}

}

const store = new SelectedFriendsStore();

dispatcher.register(store.handleEvent.bind(store));

window.selectedFriendsStore = store;

export default store;
