document.write('hello mobx')

// class Animal {
// 	name() {
// 		return 'Animal'
// 	}
// 	getName() {
// 		return `My name is ${this.name()}`
// 	}
// }

// class Dog extends Animal {
// 	food = 'bone';
// 	name() {
// 		return 'Dog'
// 	}
// }

// let courses = { name: 'english', score: 90};
// courses = { ...courses, comment: 'A'};

// let fun = () => console.log('hello babel')

import { observable, isArrayLike, computed, action } from 'mobx';

class Store {
	@observable array = [1, 2, 3];
	@observable string = 'hello';

	@computed get mixed() {
		console.log(this)
		return this.string;
	}

	@action bar() {
		this.array = [4, 5, 6,];
		this.string = 'hellohello';
	}
}
const mm = observable.box('hello')
const store = new Store();
console.log(store);
console.log(mm);
console.log(store.mixed);

class Store2 {
	get mixed() {
		console.log(this)
		return this.string;
	}
}
console.log(new Store2().(get mixed()))