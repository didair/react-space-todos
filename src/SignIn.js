import React, { Component } from 'react';

import { updateUser } from './space';
import { signInOrRegister } from './space/auth';

class SignIn extends Component {

	state = {
		email: '',
		password: '',
		needsName: false,
		name: '',
		error: false,
	};

	onEmailChange = ( event ) => {
		this.setState({ email: event.target.value });
	}

	onPassWordChange = ( event ) => {
		this.setState({ password: event.target.value });
	}

	onNameChange = ( event ) => {
		this.setState({ name: event.target.value });
	}

	onSubmit = ( event ) => {
		event.preventDefault();

		signInOrRegister({
			email: this.state.email,
			password: this.state.password,
		})
		.then( (data) => {
			if ( data.user.name == '' ) {
				//this.setState({ needsName: true });
			}
		})
		.catch( (ex) => {
			// display login error here
		});
	}

	onNameUpdate = ( event ) => {
		event.preventDefault();

		updateUser( this.state.profile._id, {'name': this.state.name } )
		.then( res => {
			console.log( 'user was updated', res );
		});
	}

	render() {
		if ( this.state.needsName ) {
			return(
				<form onSubmit={ this.onNameUpdate }>
					<h3>Heya!</h3>
					<p>You still haven't told us your name!</p>

					<input
						type="text"
						value={ this.state.name }
						onChange={ this.onNameChange }
						placeholder="Name" />

					<input type="submit" value="Save!" />
				</form>
			);
		}

		return(
			<form onSubmit={ this.onSubmit }>
				{ this.state.error ?
					<div className="login-error">
						Something went wrong! Check your credentials and try again
					</div>
				: null }

				<input
					type="email"
					value={ this.state.email }
					onChange={ this.onEmailChange }
					placeholder="E-Mail" />

				<br />

				<input
					type="password"
					value={ this.state.password }
					placeholder="Password"
					onChange={ this.onPassWordChange }
				/>

				<input type="submit" value="Login / Register" />
			</form>
		);
	}

}

export default SignIn;
