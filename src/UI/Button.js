import React from 'react';

const Button = ( props ) => {
	const buttonProps = {...props};
	delete buttonProps.children;

	return(
		<button {...buttonProps} className="button">
			{ props.children }
		</button>
	);
}

export default Button;
