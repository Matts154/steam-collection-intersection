import React, { Component } from 'react';
import ScrollToTop from "../ScrollToTop";

class FauxInfiniteScroll extends Component {
	constructor() {
		super();

		const numShown = Math.floor((window.innerHeight / 85) * 2);

		this.state = {
			numShown
		};
	}

	// https://stackoverflow.com/questions/29725828/update-style-of-a-component-onscroll-in-react-js
	componentWillMount(nextProps, nextState) {
		document.addEventListener("scroll", this.incrementNumShown.bind(this))
	}

	componentWillDismount() {
		document.removeEventListener("scroll", this.incrementNumShown.bind(this))
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	if (nextProps.children.length !== this.props.children.length) {
	// 		this.setState(
	// 			Object.assign({}, this.state, {page: 1})
	// 		);
	// 	}
	// }

	incrementNumShown() {
		const scrollYPos = window.scrollY;
		const windowHeight = window.innerHeight;
		const documentHeight = document.body.getBoundingClientRect().height;
		const distFromBottom = 200;

		const shouldAddMore = windowHeight + scrollYPos > documentHeight - distFromBottom
							 && this.state.numShown < this.props.children.length;

		if (shouldAddMore){
			const numShown = this.state.numShown + 1;
			this.setState(Object.assign({}, this.state, {numShown}));
		}
	}

	render() {
		return (
			<div className="infinite-scroll" {...this.props} onScroll={this.incrementNumShown.bind(this)}>
				{this.props.children.slice(0, this.state.numShown)}
				<ScrollToTop />
			</div>
		);
	}
}

export default FauxInfiniteScroll;
