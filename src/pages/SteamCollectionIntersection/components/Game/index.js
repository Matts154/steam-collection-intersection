import React, { Component } from 'react';
import GameImage from "./GameImage";
import GameTitle from "./GameTitle";
import PlayButton from "./PlayButton";
import "./styles.css";

class Game extends Component {
	render() {
		const { appid, name } = this.props.game;
		const imageSrc = this.props.game.img_logo_url ? `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${this.props.game.img_logo_url}.jpg` : "./img/default.png";

		return (
			<div id={appid} className="game">
				<div className="game-container">
					<GameImage src={imageSrc} alt={name} />
					<GameTitle title={name} />
					<PlayButton href={`steam://run/${appid}`} />
				</div>
			</div>
		);
	}
}

export default Game;
