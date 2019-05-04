import { app_id } from '../index';

const AUTH_CHANGE_EVENT = app_id + '_AUTH_CHANGE';
const SIGN_IN           = 'SPACE_CLOUD_AUTHENTICATION_SIGN_IN';
const SIGN_OUT          = 'SPACE_CLOUD_AUTHENTICATION_SIGN_OUT';

export const onAuthChange = ( callback ) => {
	document.addEventListener( AUTH_CHANGE_EVENT, function( event ) {
		callback( event )
	});
}

export const onSignIn = () => {
	const event = new CustomEvent( AUTH_CHANGE_EVENT, { detail: SIGN_IN } );

	document.dispatchEvent( event );
}

export const onSignOut = () => {
	const event = new CustomEvent( AUTH_CHANGE_EVENT, { detail: SIGN_OUT } );

	document.dispatchEvent( event );
}
