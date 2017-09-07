import React, { Component } from 'react';
import Fullscreen from "./Fullscreen";
import Spinner from "./Spinner";
import FoldingCube from "./FoldingCube";

class LoadingSpinner extends Component {
	render() {
		if(!this.props.show) {
			return null;
		}

		return (
			<Fullscreen>
				<Spinner>
					<FoldingCube />
				</Spinner>
			</Fullscreen>
		);
	}
}

export default LoadingSpinner;
