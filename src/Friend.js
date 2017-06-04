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
		const { friend } = this.props;
		return (
			<div className="col-md-1 col-sm-2 col-xs-3 friend">
				<input id={friend.steamid} onChange={this.toggleCheck.bind(this)} type="checkbox" style={{display: "none"}} />
				<label htmlFor={friend.steamid} className={this.state.checked ? "checked" : ""}>
					<img src={friend.avatarmedium} alt={friend.personaname} title={friend.personaname} />
					<h3 className="hidden">{friend.personaname}</h3>
				</label>
			</div>
		);
	}
}

export default Friend;
