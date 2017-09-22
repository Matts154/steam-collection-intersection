import React, { Component } from 'react';
import ScrollToTop from "../ScrollToTop";

class FiniteScroll extends Component {
	constructor() {
		super();

		this.state = {
			numShown: Math.floor((window.innerHeight / 85) * 2)
		};
	}

	// https://stackoverflow.com/questions/29725828/update-style-of-a-component-onscroll-in-react-js
	componentWillMount(nextProps, nextState) {
		document.addEventListener("scroll", this.incrementNumShown.bind(this))
	}

	componentWillDismount() {
		document.removeEventListener("scroll", this.incrementNumShown.bind(this))
	}

	componentWillUpdate(nextProps, nextState) {
		// Reset numShown if children length changes
		if (nextProps.children.length !== this.props.children.length) {
			const numShown = Math.floor((window.innerHeight / 85) * 2);
			this.setState(
				Object.assign({}, this.state, {numShown})
			);
		}
	}

	incrementNumShown() {
		const scrollYPos = window.scrollY;
		const windowHeight = window.innerHeight;
		const documentHeight = document.body.getBoundingClientRect().height;
		const distFromBottom = 200;

		const shouldAddMore = windowHeight + scrollYPos > documentHeight - distFromBottom
							 && this.state.numShown < this.props.children.length;

		if (shouldAddMore) {
			const numShown = this.state.numShown + 1;
			this.setState(Object.assign({}, this.state, {numShown}));
		}
	}

	render() {
		return (
			<div className="infinite-scroll">
				<ScrollToTop />
				<div {...this.props}>
					{this.props.children.slice(0, this.state.numShown)}
				</div>
			</div>
		);
	}
}

export default FiniteScroll;
