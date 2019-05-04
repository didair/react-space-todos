import React, { Component } from 'react';

import { updateUser } from 'space';
import { getUser } from 'space/auth';

import Button from 'UI/Button';

class UserProfile extends Component {

	state = {
		name: '',
	};

	onNameChange = ( event ) => {
		this.setState({ name: event.target.value });
	}

	onNameUpdate = ( event ) => {
		event.preventDefault();

		updateUser( getUser()._id, {'name': this.state.name } )
		.then( res => {
			if ( this.props.onUpdate ) {
				this.props.onUpdate(true);
			}
		});
	}

	render() {
		return(
			<div>
				<form onSubmit={ this.onNameUpdate }>
					<h3>Heya!</h3>
					<p style={{ fontSize: '1rem' }}>
						You haven't told us your name!
					</p>

					<input
						type="text"
						value={ this.state.name }
						onChange={ this.onNameChange }
						placeholder="Name" />

					<Button type="submit">
						Save
					</Button>
				</form>
			</div>
		);
	}

}

export default UserProfile;
