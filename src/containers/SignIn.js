import React, { Component } from 'react';

import { signInOrRegister } from 'space/auth';

import Button from 'UI/Button';

class SignIn extends Component {

	state = {
		email: '',
		password: '',
		error: false,
	};

	onEmailChange = ( event ) => {
		this.setState({ email: event.target.value });
	}

	onPassWordChange = ( event ) => {
		this.setState({ password: event.target.value });
	}

	onSubmit = ( event ) => {
		event.preventDefault();

		signInOrRegister({
			email: this.state.email,
			password: this.state.password,
		})
		.then( (data) => {
			// user was logged in
		})
		.catch( (ex) => {
			// display login error here
			this.setState({ error: true });
		});
	}

	render() {
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

				<Button type="submit">
					Login / Register
				</Button>
			</form>
		);
	}

}

export default SignIn;
