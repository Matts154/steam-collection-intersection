import React, { Component } from 'react';
import _ from 'lodash';

import Friend from "./Friend";

class FriendsList extends Component {
	render() {
		if (!this.props || !this.props.friends) {
			return null;
		}

		let friendComponents = this.props.friends.map(friend => {
			return (
				<Friend
					key={friend.steamid}
					friend={friend}
					handleClick={this.props.handleClick}
					selected={this.props.selected.includes(friend.steamid)}
				/>);
		});

		return (
			<div id="friends-list">
				<div className="friends-wrapper">
					{friendComponents}
				</div>
			</div>
		);
	}
}

export default FriendsList;
