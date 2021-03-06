import React, { Component } from 'react';
import './App.css';

import {
	isSignedIn,
	getUser,
	onAuthChange,
} from 'space/auth';

import SignIn from './SignIn';
import Todos from './Todos';
import UserProfile from './UserProfile';

import Content from 'UI/Content';

class App extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			loggedIn: isSignedIn(),
		}
	}

	componentDidMount() {
		onAuthChange( ( event ) => {
			console.debug( 'auth changed', event );

			this.setState({ loggedIn: isSignedIn() });
		});
	}

	onProfileUpdate = () => {
		this.setState({ loggedIn: isSignedIn() });
	}

	render() {
		const { loggedIn } = this.state;

		console.log( 'App render is signed in, user object', loggedIn, getUser() );

		return (
			<div className="App">
				<header className="App-header">
					<Content>
						{ loggedIn ?
							getUser().name != '' ?
								<Todos />
							:
								<UserProfile
									onUpdate={ this.onProfileUpdate }
								/>
						:
							<SignIn />
						}
					</Content>

					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
				</header>
			</div>
		);
	}

}

export default App;
