import React, { Component } from 'react';
import "./styles.css";

// Not as cool as a YouTube play button
class PlayButton extends Component {
	render() {
		const {href, alt} = this.props;
		return (
			<a className="btn btn-success btn-play hidden-xs hidden-sm" href={href}>
				Play!
			</a>
		);
	}
}

export default PlayButton;
