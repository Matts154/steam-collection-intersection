import React, { Component } from 'react';

import "./styles.css";

class LoadingSpinner extends Component {
	render() {
		if(!this.props.show) {
			return null;
		}

		return (
			<div className="fullscreen">
				<div className="spinner">
					<div className="sk-folding-cube">
					  <div className="sk-cube1 sk-cube"></div>
					  <div className="sk-cube2 sk-cube"></div>
					  <div className="sk-cube4 sk-cube"></div>
					  <div className="sk-cube3 sk-cube"></div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoadingSpinner;
