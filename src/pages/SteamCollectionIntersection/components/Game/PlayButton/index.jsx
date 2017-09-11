import React, { PureComponent } from 'react';
import "./styles.css";

// Not as cool as a YouTube play button
class PlayButton extends PureComponent {
	render() {
		const { href } = this.props;
		return (
			<a className="btn btn-success btn-play hidden-xs hidden-sm" href={href}>
				Play!
			</a>
		);
	}
}

export default PlayButton;
