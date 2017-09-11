import React, { PureComponent } from 'react';
import "./styles.css";

class Game extends PureComponent {
	render() {
		const { alt, src } = this.props;

		return (
			<img className="game-image" src={src} alt={alt} />
		);
	}
}

export default Game;
