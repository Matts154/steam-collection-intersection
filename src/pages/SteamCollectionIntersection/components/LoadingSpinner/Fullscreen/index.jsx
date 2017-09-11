import React, { PureComponent } from 'react';
import "./styles.css";

class Fullscreen extends PureComponent {
	render() {
		return (
			<div className="fullscreen">
				{this.props.children}
			</div>
		);
	}
}

export default Fullscreen;
