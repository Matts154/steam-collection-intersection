import React, { Component } from 'react';

class Pagination extends Component {
	constructor() {
		super();
		this.state = {
			page: 1,
			numPerPage: 14,
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.children !== undefined;
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.children.length != this.props.children.length) {
			this.setState(
				Object.assign({}, this.state, {page: 1})
			);
		}
	}

	changePage(page) {
		this.setState(Object.assign({}, this.state, {page}));
	}

	render() {
		const { page, numPerPage } = this.state;
		const num = this.props.children.length;
		const pageNumbers = Array(Math.ceil(num / numPerPage)).fill(null).map((_, index) => {
			const page = index + 1;
			return (<a className="page-number" value={page} onClick={() => this.setState(Object.assign({}, this.state, {page}))}>{page}</a>);
		});

		return (
			<div className="pagination">
				<div className="page-number-list">
					{pageNumbers}
				</div>
				<div {...this.props}>
					{this.props.children.slice((page - 1) * numPerPage, page * numPerPage)}
				</div>
			</div>
		);
	}
}

export default Pagination;
