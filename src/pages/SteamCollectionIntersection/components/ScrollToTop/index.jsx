import React, { PureComponent } from 'react';
import "./styles.css";

class ScrollToTop extends PureComponent {
	render() {
		return (
			<div className="scroll-to-top" onClick={() => window.scrollTo(0,0)}>
				<i className="fa fa-arrow-up fa-lg"><br /><p>TOP</p></i>
			</div>
		);
	}
}

export default ScrollToTop;
