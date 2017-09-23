import React, { PureComponent } from 'react';

function getWidth() {
	return document.body.clientWidth;
}

class VirtualMediaQuery extends PureComponent {
	constructor() {
		super();

		this.state = {
			width: getWidth()
		}

		this.updateWidth = this.updateWidth.bind(this);
	}

	componentWillMount() {
		window.addEventListener("resize", this.updateWidth);
	}

	componentWillDismount() {
		window.removeEventListener("resize", this.updateWidth);
	}

	updateWidth() {
		this.setState(Object.assign({}, this.state, { width: getWidth() }))
	}

	render() {
		const { minWidth, maxWidth } = this.props;
		const { width } = this.state;

		let willRender = (minWidth && width > minWidth) ||
						 (maxWidth && width <= maxWidth);

		return (willRender ? this.props.children : null);

	}
}

export default VirtualMediaQuery;
