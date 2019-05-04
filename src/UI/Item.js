import React from 'react';

const Item = ( props ) => {
	const itemProps = {...props};
	delete itemProps.children;

	return(
		<div className="item" {...itemProps}>
			{ props.children }
		</div>
	);
};

export default Item;
