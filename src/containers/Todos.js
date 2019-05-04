import React, { Component, Fragment } from 'react';

import { getData, addData, updateData } from 'space';
import { getUser, signOut } from 'space/auth';

import TodoForm from 'containers/Forms/TodoForm';
import Item from 'UI/Item';

class Todos extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			todos: null,
		};
	}

	componentDidMount() {
		this.getTodos();
	}

	getTodos = () => {
		getData( 'todos' ).then( todos => {
			this.setState({ todos });
		});
	}

	onSubmit = ( values ) => {
		addData( 'todos', values )
		.then( ( added ) => {
			this.getTodos();
		});
	}

	todoClick = ( todo ) => {
		updateData( 'todos', todo._id, {
			done: ! todo.done,
		}).then( () => {
			this.getTodos();
		});
	}

	renderTodos = () => {
		if ( this.state.todos != null && this.state.todos.length > 0 ) {
			return <Fragment>
				{ this.state.todos.map( todo => {
					let style = {};
					if ( todo.done ) {
						style.textDecoration = 'line-through';
					}

					return <Item style={ style } key={ todo._id } onClick={ e => this.todoClick( todo ) }>
						{ todo.content }
					</Item>
				}) }
			</Fragment>
		}

		return null;
	}

	logout = ( event ) => {
		event.preventDefault();
		signOut();
	}

	render() {
		return(
			<Fragment>
				<h3>Welcome, { getUser().name }</h3>

				<div style={{ fontSize: '0.95rem', cursor: 'pointer' }} onClick={ this.logout }>
					Sign out
				</div>

				<div style={{ marginTop: '1rem' }}>
					<TodoForm onSubmit={ this.onSubmit } />
				</div>


				<div style={{ marginTop: '1rem' }}>
					{ this.renderTodos() }
				</div>
			</Fragment>
		);
	}

}

export default Todos;
