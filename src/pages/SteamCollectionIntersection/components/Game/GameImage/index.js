import React, { Component } from 'react';
import "./styles.css";

class Game extends Component {
	render() {
		const { alt, src } = this.props;

		return (
			<img className="game-image" src={src} alt={alt} />
		);
	}
}

export default Game;
