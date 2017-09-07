import React, { Component } from 'react';
import "./styles.css";

class Spinner extends Component {
	render() {
		return (
			<div className="spinner">
				{this.props.children}
			</div>
		);
	}
}

export default Spinner;
