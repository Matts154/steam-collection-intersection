import React, { Component } from 'react';
import _ from 'lodash';

import Friend from "./Friend";

class FriendsList extends Component {
	render() {
		let friendComponents = this.props.friends.map((friend, i) => {
			return (<Friend key={friend.steamid} friend={friend} handleClick={this.props.handleClick}/>);
		});

		return this.props.friends.length > 0 ? (
			<div id="friends-list" className="row">
				{friendComponents}
			</div>
		) : (<div></div>);
	}
}

export default FriendsList;
