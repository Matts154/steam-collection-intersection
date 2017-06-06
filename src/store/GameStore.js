import { EventEmitter } from "events";
import { GAMES_CHANGED, FETCH_GAMES, FETCH_GAMES, RECEIVED_GAMES } from "../constant/Constants";
import GameActions from "../action/GameActions";
import * from "../FetchHelpers";

class GameStore extends EventEmitter {
    constructor() {
        super();
        this.games = [];
    }

    async updateGames({ steamid }) {
        const options = {
            method: "GET",
            mode: "cors"
        };

        this.emit(FETCH_GAMES);

        try {
            var response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamid}&include_appinfo=1&include_played_free_games=1&format=json`, options);
            var status = await checkStatus(response);
            var data = await getJSON(response);
        } catch (err) {
            this.emit(FETCH_GAMES_ERROR);
            return;
        }

        this.games = response.games;

        this.emit(RECEIVED_GAMES);
    }

    getAllGames() {
        return this.games;
    }

    handleActions(action) {
        switch(action.type) {
            case GAMES_CHANGED:
                updateGames(action);
            default:
                break;
        }
    }
}

const gameStore = new GameStore;

gameStore.on(gameConstant.change, updateGames);

export default gameStore;
