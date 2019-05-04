import { app_id } from '../index';

export const setAuthDetails = ( auth ) => {
	return localStorage.setItem( app_id + '_auth', JSON.stringify( auth ) );
}

export const getAuthDetails = () => {
	return JSON.parse( localStorage.getItem( app_id + '_auth' ) );
}

export const clearAuthDetails = () => {
	return localStorage.removeItem( app_id + '_auth' );
}
