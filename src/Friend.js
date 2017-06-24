import React, { Component } from 'react';
import _ from 'lodash';

class Friend extends Component {
	constructor(props) {
		super();
		this.state = {
			checked: false
		}
	}

	toggleCheck(event) {
		this.setState(
			Object.assign(this.state, {
				checked: event.target.checked
			})
		)

		this.props.handleClick(event);
	}

	render() {
		const { steamid, avatarfull, personaname } = this.props.friend;

		return (
			<div className="friend">
				<input id={steamid} onChange={this.toggleCheck.bind(this)} type="checkbox" style={{display: "none"}} />
				<label htmlFor={steamid} className={this.state.checked ? "checked" : ""}>
					<img src={avatarfull} alt={personaname} title={personaname} />
					<h3 className="hidden">{personaname}</h3>
				</label>
			</div>
		);
	}
}

export default Friend;
