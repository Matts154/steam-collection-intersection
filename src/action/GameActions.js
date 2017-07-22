import { dispatcher } from "../dispatcher.js";
import Constants from "../constant/Constants";

export function addUsersGames(user) {
    fetch(`https://steam-api-proxy.herokuapp.com/IPlayerService/GetOwnedGames/v0001/?steamid=${user.steamid}&include_appinfo=1&include_played_free_games=1&format=json`)
        .then(this.checkStatus)
        .then(this.getJSON)
        .then(data => dispatcher.dispatch({
            type: Constants.GAMES.RECEIVED,
            data: data.response.games
        })
}
