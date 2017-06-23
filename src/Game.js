import React, { Component } from 'react';
import _ from 'lodash';

class Game extends Component {
	render() {
		const { appid, name } = this.props.game;
		// const appid = this.props.game.appid;
		// const name = this.props.game.name;
		const href = this.props.game.img_logo_url ? `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${this.props.game.img_logo_url}.jpg` : "./img/default.png";
		return (
			<div id={appid} className="game">
				<div className="game-container">
					<img src={href} alt={name}/>
					<h4 className="game-title">{name}</h4>
					<a className="btn btn-success btn-play hidden-xs hidden-sm" href={`steam://run/${appid}`}>Play!</a>
				</div>
			</div>
		);
	}
}

export default Game;
