import React, { Component } from 'react';
import _ from 'lodash';

class Game extends Component {
	render() {
		const { appid, name } = this.props.game;
		// const appid = this.props.game.appid;
		// const name = this.props.game.name;
		const href = this.props.game.img_logo_url ? "http://media.steampowered.com/steamcommunity/public/images/apps/{0}/{1}.jpg".format(appid, this.props.game.img_logo_url) : "./img/default.png";
		return (
			<div id={appid} className="col-md-6">
				<a className="game" href={"steam://run/{0}".format(appid)}>
					<div className="game-image">
						<img src={href} alt={name} className=""/>
					</div>
					<h4 className="game-title">{name}</h4>
				</a>
			</div>
		);
	}
}

export default Game;
