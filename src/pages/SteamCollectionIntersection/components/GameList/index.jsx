import React, { Component } from 'react';

import Game from "../Game";
import FauxInfiniteScroll from "../FauxInfiniteScroll";
import "./styles.css";

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
				<FauxInfiniteScroll id="games">
					{gameComponents}
				</FauxInfiniteScroll>
			</div>
		);
	}
}

export default GameList;
