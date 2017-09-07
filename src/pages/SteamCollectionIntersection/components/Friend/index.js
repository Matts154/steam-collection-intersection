import React, { Component } from 'react';
import "./styles.css";

class Friend extends Component {
	toggle(event) {
		const { steamid } = this.props.friend;
		const selected = this.props.selected;

		this.props.handleClick(steamid, !selected);
	}

	render() {
		const { steamid, avatarfull, personaname } = this.props.friend;
		const selected = this.props.selected;

		return (
			<div id={steamid}
				className={"friend" + (selected ? " checked" : "")}
				onClick={this.toggle.bind(this)}>
				<img src={avatarfull} alt={personaname} title={personaname} />
			</div>
		);
	}
}

export default Friend;
