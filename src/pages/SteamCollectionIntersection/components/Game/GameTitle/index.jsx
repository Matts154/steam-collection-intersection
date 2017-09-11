import React, { PureComponent } from 'react';
import "./styles.css";

class GameTitle extends PureComponent {
	render() {
		return (
			<p className="game-title">{this.props.title}</p>
		);
	}
}

export default GameTitle;
