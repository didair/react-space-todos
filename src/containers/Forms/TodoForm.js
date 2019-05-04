import React, { Component } from 'react';

import Button from 'UI/Button';

class TodoForm extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			text: '',
		};
	}

	onSubmit = ( event ) => {
		event.preventDefault();

		if ( this.state.text == '' ) {
			return;
		}

		if ( this.props.onSubmit ) {
			this.props.onSubmit({
				content: this.state.text,
				done: false,
			});
		}

		this.setState({ text: '' });
	}

	render() {
		return(
			<form onSubmit={ this.onSubmit }>
				<input
					type="text"
					onChange={ event => { this.setState({ text: event.target.value }) }}
					value={ this.state.text }
					placeholder="Add todo"
				/>

				<Button type="submit">Add todo</Button>
			</form>
		);
	}

}

export default TodoForm;
