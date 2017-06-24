import React, { Component } from 'react';
import _ from 'lodash';

import FriendsList from "./FriendsList";
import GameList from "./GameList";

import ApiKey from "./ApiKey";

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            steamid: null,
            user: {},
            games: [],
            friends: [],
            selectedFriends: []
        };
        this.delay = null;
    }

    checkStatus(response) {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(
                new Error(response.statusText)
            );
        }
    }

    getJSON(response) {
        return response.json()
    }

    handleFriendSelection(event) {
        const checked = event.target.checked;
        const id = event.target.id;
        let friend = this.state.friends.find((f) => { return f.steamid === id });
        let selectedFriends = this.state.selectedFriends.slice();
        let sharedGames = [];

        console.log("Checked:", checked);

        if(checked) { // Adding to selectedFriends
            const options = {
                method: 'GET',
                mode: 'cors'
            };
            const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${ApiKey}&steamid=${friend.steamid}&include_appinfo=1&include_played_free_games=1&format=json`
            fetch(url, options)
                .then(this.checkStatus)
                .then(this.getJSON)
                .then(function(data) {
                    friend.games = data.response.games;
                    selectedFriends.push(friend);

                    sharedGames = this.state.games.filter(function(game) {
                        return selectedFriends.every(function(friend) {
                            return friend.games.some(function(friendsGame){
                                return game.appid === friendsGame.appid;
                            });
                        });
                    });

                    console.log("Found games", sharedGames);

                    this.setState(
                        Object.assign(this.state, {
                            sharedGames: sharedGames,
                            selectedFriends: selectedFriends
                        })
                    );
                }.bind(this))
                .catch(function(err) {
                    console.error(err);
                });

        } else { // Removing from selectedFriends
            selectedFriends = selectedFriends.filter(function(f) {
                return friend.steamid !== f.steamid;
            });

            if (selectedFriends.length === 0) {
                sharedGames = [];
            } else {
                sharedGames = this.state.games.filter(function(game) {
                    return selectedFriends.every(function(friend) {
                        return friend.games.some(function(friendsGame){
                            return game.appid === friendsGame.appid;
                        });
                    });
                });
            }

            this.setState(Object.assign(this.state, {
                sharedGames: sharedGames,
                selectedFriends: selectedFriends
            }))
        }

    }

    getGameList(steamid) {

    }

    findSharedGames(selectedFriends, usersGames) {
        if (!selectedFriends || !usersGames) {
            return [];
        }

        return usersGames.find(function(game) {
            return selectedFriends.every(function(friend) {
                return friend.games.includes(game);
            });
        });
    }

    resolveUserInfo(event) {
        const eventVal = event.target.value;
        const options = {
            method: 'GET',
            mode: 'cors'
        };
        var steamid = null;
        clearTimeout(this.delay);
        this.delay = setTimeout(() => {
            // Get the steamid based on their username
            fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${ApiKey}&vanityurl=${eventVal}`, options)
                .then(this.checkStatus)
                .then(this.getJSON)
                .then(data => this.setState(Object.assign({}, this.state, {steamid: data.response.steamid})))
                .then(() => { return fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${ApiKey}&steamid=${this.state.steamid}&relationship=friend`, options) })
                .then(this.checkStatus)
                .then(this.getJSON)
                .then(data => data.friendslist.friends.map(friend => friend.steamid))
                .then(friendIDs => { return fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${ApiKey}&steamids=${friendIDs.toString()}${"," + this.state.steamid}`, options) })
                .then(this.checkStatus)
                .then(this.getJSON)
                .then((data) => {
                    const user = _.remove(data.response.players, user => {
                        return user.steamid === this.state.steamid;
                    })[0];

                    const friends = data.response.players;
                    // Get the users owned games
                    fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${ApiKey}&steamid=${this.state.steamid}&include_appinfo=1&include_played_free_games=1`, options)
                        .then(this.checkStatus)
                        .then(this.getJSON)
                        .then((data) => {
                            const games = data.response.games;
                            this.setState(Object.assign(this.state, {user, friends, games}));
                    });

                })
                .catch(function(err){
                    console.error(err);
                });
        }, 1000);
    }

    render() {
        return (
            <div className="app-container">
                <div id="user">
                    <img src={this.state.user.avatarmedium || ""} alt={this.state.user.personaname || ""} title={this.state.user.personaname || ""}/>
                    <br />
                    <input onChange={this.resolveUserInfo.bind(this)} placeholder="Username"/>
                </div>
                <FriendsList
                    friends={this.state.friends}
                    handleClick={this.handleFriendSelection.bind(this)}
                />
                <GameList
                    games={this.state.sharedGames}
                />
            </div>
        );
    }
}

export default App;
