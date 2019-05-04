import React from 'react';

const Item = ( props ) => {
	const itemProps = {...props};
	delete itemProps.children;

	return(
		<div className="item" {...itemProps}>
			<div className="item-content">
				{ props.children }
			</div>
		</div>
	);
};

export default Item;
