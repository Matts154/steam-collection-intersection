import React, { Component } from 'react';

import FriendsList from "./components/FriendsList";
import GameList from "./components/GameList";
import LoadingSpinner from "./components/LoadingSpinner";

import { addUserBySteamURL,
         addSelectedFriend,
         removeSelectedFriend,
         clearStore } from "./stores/User/actions";

import UserStore from "./stores/User/store";
import { EVENT } from "./stores/User/constants";


import './styles.css';

class SteamCollectionIntersection extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            selectedFriends: [],
            sharedGames: [],
            loading: false
        };

        this.updateState = this.updateState.bind(this);
        this.toggleLoadingOn = this.toggleLoadingOn.bind(this);
        this.toggleLoadingOff = this.toggleLoadingOff.bind(this);
    }

    componentWillMount() {
        UserStore.on(EVENT.FETCHING, this.toggleLoadingOn);
        UserStore.on(EVENT.DONE, this.toggleLoadingOff);
        UserStore.on(EVENT.ERROR, this.toggleLoadingOff);

        UserStore.on(EVENT.DONE, this.updateState);
    }

    componentWillDismount() {
        UserStore.removeListener(EVENT.FETCHING, this.toggleLoadingOn);
        UserStore.removeListener(EVENT.DONE, this.toggleLoadingOff);
        UserStore.removeListener(EVENT.ERROR, this.toggleLoadingOff);

        UserStore.removeListener(EVENT.DONE, this.updateState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("New state", this.state);
    }

    updateState() {
        const { user, selectedFriends } = UserStore.getStore();
        // const user = UserStore.getUser();
        // const selectedFriends = SelectedFriendsStore.getFriends();
        var sharedGames = [];

        if (selectedFriends.length > 0) {
            var filteredFriends = this.state.user.friends.filter(friend => selectedFriends.includes(friend.steamid));
            sharedGames = this.findSharedGames(filteredFriends, this.state.user.games)
        }

        const newState = Object.assign({}, this.state, {user, selectedFriends, sharedGames});

        this.setState(newState);
    }

    toggleLoadingOn() {
        this.setState(
            Object.assign({}, this.state, {loading: true})
        );
    }

    toggleLoadingOff() {
        this.setState(
            Object.assign({}, this.state, {loading: false})
        );
    }

    handleUserSubmit(form) {
        const profileURL = form.children["profile_url"].value;

        if(profileURL) {
            clearStore();
            addUserBySteamURL(profileURL);
        }
    }

    handleFriendSelection(steamid, checked) {
        if(checked){
            addSelectedFriend(steamid);
        } else {
            removeSelectedFriend(steamid);
        }
    }

    findSharedGames(friends, games) {
        if (friends.length === 0 || games.length === 0) {
            return [];
        }

        return games.filter(function(game) {
            return friends.every(function(friend) {
                return friend.games.some(function(friendsGame){
                    return game.appid === friendsGame.appid;
                });
            });
        });
    }

    render() {
        const userImageStyle = this.state.user.avatarmedium ? {} : {display: "none"};

        return (
            <div className="app-container">
                <LoadingSpinner show={this.state.loading}/>
                <div id="user">
                    <img style={userImageStyle} src={this.state.user.avatarmedium || ""} alt={this.state.user.personaname || ""} title={this.state.user.personaname || ""}/>
                    <form onSubmit={ (e) => {e.preventDefault(); this.handleUserSubmit(e.target);} }>
                        <input id="profile_url" placeholder="Profile URL"/>
                        <button type="submit" className={"btn btn-success btn-submit" + (this.state.loading ? " disabled" : "")} disabled={this.state.loading ? "disabled" : ""}>Submit</button>
                    </form>
                </div>
                <FriendsList
                    friends={this.state.user.friends}
                    selected={this.state.selectedFriends}
                    handleClick={this.handleFriendSelection.bind(this)}
                />
                <GameList
                    games={this.state.sharedGames}
                />
            </div>
        );
    }
}

export default SteamCollectionIntersection;
