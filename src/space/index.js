import {
	API,
	and,
	cond,
} from 'space-api';

import { getUser, isSignedIn } from './auth';
import { getAuthDetails, setAuthDetails } from './client/storage';

export const app_id = 'cloud';

export const api = new API( app_id, 'http://localhost:8080' );

// For MongoDB
export const db = api.Mongo();

export const generateId = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;

		return v.toString(16);
	});
}

// Gets the data for the currently authenticated user
export const getMe = () => {
	return new Promise( (resolve, reject) => {
		if ( isSignedIn() && getUser() != null ) {
			db.profile( getUser()._id )
			.then( (res) => {
				if (res.status === 200) {
					resolve( res.data.user );

					return;
				}

				resolve( null );
			});
		}

		resolve( null );
	});
}

// Updates an user by id data is an object with fields to be updated
export const updateUser = ( id, data ) => {
	return new Promise( resolve => {
		const find = cond( '_id', '==', id );

		db.updateOne('users').where( find )
		.set( data ).apply()
		.then( res => {
			if ( getUser()._id == id ) {
				const user = getUser();
				let authDetails = getAuthDetails();
				authDetails.user = { ...user, ...data };

				setAuthDetails( authDetails );
			}

			resolve( res );

			return;
		})
	});
}

// Gets the users data in the collection
// Automatically appends the userId on the query
export const getData = ( collection ) => {
	return new Promise( (resolve, reject) => {
		const user = getUser();

		const find = cond( 'userId', '==', user._id );

		db.get( collection )
		.where( find )
		.all()
		.then( res => {
			if ( res.status === 200 ) {
				resolve( res.data.result );

				return;
			}

			reject( res );
		})
		.catch( ex => {
			reject( ex );
		})
	});
}

// inserts the data object into collection
// Automatically appends the userId on the query
export const addData = ( collection, data ) => {
	return new Promise( (resolve, reject) => {
		const user = getUser();

		data._id    = generateId();
		data.userId = user._id;

		db.insert( collection )
		.one( data )
		.then( res => {
			if ( res.status === 200 ) {
				resolve( res.data );

				return;
			}

			reject( res );
		})
		.catch( ex => {
			reject( ex );
		})
	});
}

// Updates an entry in the db in collection
// finds by the id param and updates the fields in the data object
// Automatically appends the userId on the query
export const updateData = ( collection, id, data ) => {
	return new Promise( (resolve, reject) => {
		const user = getUser();

		const find = and( cond( '_id', '==', id ), cond( 'userId', '==', user._id ));

		db.update( collection )
		.where( find )
		.set( data ).apply()
		.then( res => {
			if ( res.status === 200 ) {
				resolve( res );

				return;
			}

			reject( 0 );
		})
		.catch( ex => {
			reject( ex );
		});
	});
}

// Removes an entry in the db in collection
// Finds by the id param
// Automatically appends the userId on the query
export const removeData = ( collection, id ) => {
	return new Promise( (resolve, reject) => {
		const user = getUser();

		const find = and( cond( '_id', '==', id ), cond( 'userId', '==', user._id ));

		db.delete( collection )
		.where( find )
		.apply()
		.then( res => {
			if ( res.status === 200 ) {
				resolve( res );

				return;
			}

			reject( 0 );
		})
		.catch( ex => {
			reject( ex );
		});
	});
}
