import { observable, action, computed } from 'mobx';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react';
import PropTypes from 'prop-types';

console.log(observable)
console.log(React)
console.log(ReactDOM)
console.log(observer)
console.log(PropTypes)
console.log(process.env.NODE_ENV)

class Todo {
	id = Math.random();
	@observable title = '';
	@observable finished = false;

	constructor(title) {
		this.title = title;
	}
}

class Store {
	@observable todos = [];

	@action.bound createTodo(title) {
		this.todos.unshift(new Todo(title));
	}

	@computed get left() {
		return this.todos.filter(todo => !todo.finished).length;
	}
}

var store = new Store();

@observer
class TodoList extends Component {
	static propTypes = {
		store: PropTypes.shape({
			createTodo: PropTypes.func,
			todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired,
		}).isRequired,
	};

	state = {
		inputValue: '',
	};

	handleSubmit = (e) => {
		e.preventDefault();
		var store = this.props.store;
		var inputValue = this.state.inputValue;
		store.createTodo(inputValue);
		this.setState({ inputValue: '' });

	}

	handleChange = (e) => {
		var inputValue = e.target.value;
		this.setState({
			inputValue,
		});
	}

	render() {
		const store = this.props.store;
		return <div className="todo-list">
			<header>
				<form onSubmit={this.handleSubmit}>
					<input type="text"
						onChange={this.handleChange}
						value={this.state.inputValue}
						className="input"
						placeholder="what needs to be finished"
					/>
				</form>
			</header>
			<ul></ul>
			<footer>{store.left} items left</footer>
		</div>
	}
}

ReactDOM.render(<TodoList store={store}/>, document.querySelector('#root'));