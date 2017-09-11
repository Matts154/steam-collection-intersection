import React, { PureComponent } from 'react';
import "./styles.css";

class Spinner extends PureComponent {
	render() {
		return (
			<div className="spinner">
				{this.props.children}
			</div>
		);
	}
}

export default Spinner;
