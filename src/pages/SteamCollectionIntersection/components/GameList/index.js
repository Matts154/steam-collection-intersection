import React, { Component } from 'react';

import Game from "../Game";
import Pagination from "../Pagination";

class GameList extends Component {
	render() {
		if (!this.props.games || this.props.games.length === 0) {
			 return null;
		 }

		let gameComponents = this.props.games.map((game, i) => {
			return (<Game key={game.appid} game={game}/>);
		});

		return (
			<div id="games-list">
				<p className="num-games">Number of games: {this.props.games.length}</p>
				<Pagination id="games">
					{gameComponents}
				</Pagination>
			</div>
		);
	}
}

export default GameList;
