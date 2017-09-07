import React, { Component } from 'react';
import "./styles.css";

class Fullscreen extends Component {
	render() {
		return (
			<div className="fullscreen">
				{this.props.children}
			</div>
		);
	}
}

export default Fullscreen;
