import { db, api } from './index';

import { 
	getAuthDetails,
	setAuthDetails,
	clearAuthDetails,
} from './client/storage';

import { 
	onSignIn,
	onSignOut,
	onAuthChange as onAuthChangeEvent,
} from './client/events';

export const isSignedIn = () => {
	if ( getAuthDetails() != null ) {
		return true;
	}

	return false;
}

export const getUser = () => {
	if ( getAuthDetails() != null ) {
		return getAuthDetails().user;
	}

	return null;
}

export const getToken = () => {
	if ( getAuthDetails() != null ) {
		return getAuthDetails().token;
	}

	return null;
}

export const onAuthChange = onAuthChangeEvent;

export const signOut = () => {
	clearAuthDetails();
	onSignOut();
}

export const signInOrRegister = ( auth ) => {
	return new Promise( (resolve, reject) => {
		db.signIn(auth.email, auth.password).then(res => {
			if ( res.status === 200 ) {
				api.setToken( res.data.token )
				setAuthDetails( res.data );
				onSignIn();

				resolve( res.data );

				return;
			}

			if ( res.status === 404 ) {
				// Register needed
				// SignUp
				db.signUp(auth.email, '', auth.password, 'default').then(res => {
					if (res.status === 200) {
						api.setToken( res.data.token )
						setAuthDetails( res.data );
						onSignIn();

						resolve( res.data );

						return;
					}

					reject( 0 );
				}).catch(ex => {
					reject( ex );

					return;
				});
			}

			// Request failed
		}).catch( ex => {
			// Exception occured while processing request
			reject( ex );

			return;
		});
	});
}

if ( isSignedIn() ) {
	api.setToken( getToken() );
}
