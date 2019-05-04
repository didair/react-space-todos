import React, { Component, Fragment } from 'react';
import { getData, addData, updateData } from './space';
import { getUser, signOut } from './space/auth';

class Todos extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			text: '',
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

	onSubmit = ( event ) => {
		event.preventDefault();

		if ( this.state.text != '' ) {
			addData( 'todos', {
				content: this.state.text,
				done: false,
			}).then( ( added ) => {
				this.setState({ text: '' });
				this.getTodos();
			});
		}
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
					let style = {
						padding: '0.55rem 0',
						borderBottom: '1px solid #ccc',
						cursor: 'pointer',
					};

					if ( todo.done ) {
						style.textDecoration = 'line-through';
					}

					return <div style={ style } key={ todo._id } onClick={ e => this.todoClick( todo ) }>
						{ todo.content }
					</div>
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
			<div>
				<h3>Welcome, { getUser().name }</h3>

				<div style={{ fontSize: '0.95rem', cursor: 'pointer' }} onClick={ this.logout }>
					Sign out
				</div>

				<form onSubmit={ this.onSubmit } style={{ marginTop: '1rem' }}>
					<input
						type="text"
						onChange={ event => { this.setState({ text: event.target.value }) }}
						value={ this.state.text }
						placeholder="Add todo"
					/>

					<input type="submit" value="Submit" />
				</form>

				<div style={{ marginTop: '1rem' }}>
					{ this.renderTodos() }
				</div>
			</div>
		);
	}

}

export default Todos;
