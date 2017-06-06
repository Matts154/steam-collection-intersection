import { dispatcher } from "../dispatcher.js";
import Constants from "../constant/Constants";

export function updateGames(steamid) {
    dispatcher.dispatch({
        type: Constants.game.change,
        steamid
    });
}
