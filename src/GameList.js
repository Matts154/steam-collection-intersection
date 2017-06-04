import React, { Component } from 'react';
import _ from 'lodash';

import Game from "./Game";

class GameList extends Component {
	constructor() {
		super();
		this.state = {
			pageSize: 3000,
			page: 1,
		}
	}

	handleClick(event){

	}

	render() {
		if (!this.props.games) { return (<div></div>); }

		let gameComponents = this.props.games.map((game, i) => {
			return (<Game style={{display: "inline-block"}} key={game.appid} game={game}/>);
		});

		return (
			<div id="games-list" className="row" style={{textAlign: "left"}}>
				<p>Number of games: {this.props.games.length}</p>
				{gameComponents.slice((this.state.page-1) * this.state.pageSize, this.state.page * this.state.pageSize)}
			</div>
		);
	}
}

export default GameList;
