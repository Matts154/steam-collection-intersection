import React, { Component } from 'react';
import _ from 'lodash';

class Friend extends Component {
	constructor(props) {
		super();
		this.state = {
			checked: false
		}
	}

	toggle(event) {
		const { steamid } = this.props.friend;
		const checked = !this.state.checked;
		this.setState(
			Object.assign(this.state, {
				checked
			})
		)

		this.props.handleClick(steamid, checked);
	}

	render() {
		const { steamid, avatarfull, personaname } = this.props.friend;
		const { checked } = this.state;

		return (
			<img id={steamid} className={"friend" + (checked ? " checked" : "")} src={avatarfull} alt={personaname} title={personaname} onClick={this.toggle.bind(this)} />
		);
	}
}

export default Friend;
