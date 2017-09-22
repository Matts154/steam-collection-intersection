import React, { Component } from 'react';
import "./styles.css";

class Pagination extends Component {
	constructor() {
		super();
		this.state = {
			page: 1,
			numPerPage: 14,
		};
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.children.length !== this.props.children.length) {
			this.setState(
				Object.assign({}, this.state, {page: 1})
			);
		}
	}

	changePage(page) {
		const pageMin = 1;
		const pageMax = Math.ceil(this.props.children.length / this.state.numPerPage);

		if (page < pageMin) { page = pageMin; }
		if (page > pageMax) { page = pageMax; }

		this.setState(Object.assign({}, this.state, {page}));
	}

	render() {
		const { page, numPerPage } = this.state;
		const num = this.props.children.length;
		const pageNumbers = Array(Math.ceil(num / numPerPage)).fill(null).map((_, index) => {
			const page = index + 1;
			return (<a key={index} className="pagination-nav number" onClick={() => this.changePage(page)}>{page}</a>);
		});

		return (
			<div className="pagination">
				<div className="page-number-list">
					<a className="pagination-nav arrow" onClick={() => this.changePage(this.state.page - 1)}><i className="fa fa-arrow-left fa-sm"></i></a>
					{pageNumbers}
					<a className="pagination-nav arrow" onClick={() => this.changePage(this.state.page + 1)}><i className="fa fa-arrow-right fa-sm"></i></a>
				</div>
				<div {...this.props}>
					{this.props.children.slice((page - 1) * numPerPage, page * numPerPage)}
				</div>
				<div className="page-number-list">
					<a className="pagination-nav arrow" onClick={() => this.changePage(this.state.page - 1)}><i className="fa fa-arrow-left fa-sm"></i></a>
					{pageNumbers}
					<a className="pagination-nav arrow" onClick={() => this.changePage(this.state.page + 1)}><i className="fa fa-arrow-right fa-sm"></i></a>
				</div>
			</div>
		);
	}
}

export default Pagination;
