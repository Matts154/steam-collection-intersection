import React, { Component } from 'react';
import "./styles.css";

class GameTitle extends Component {
	render() {
		return (
			<p className="game-title">{this.props.title}</p>
		);
	}
}

export default GameTitle;
