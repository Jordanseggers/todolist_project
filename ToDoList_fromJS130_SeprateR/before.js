class Todo {
  constructor(title) {
    this.title = title;
    this.done = false;
  }
  
  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }
  
  markDone() {
    this.done = true;
  }
  
  markUndone() {
    this.done = false;
  }
  
  isDone() {
    return this.done;
  }
  
  getTitle() {
    return this.title;
  }
}

Todo.DONE_MARKER = "X";
Todo.UNDONE_MARKER = " ";

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  
  add(todo) {
    if(todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError("can only add Todo objects")
    }
  }
  
  size() {
    return this.todos.length;
  }
  
  first() {
    return this.todos[0];
  }
  
  last() {
    return this.todos[this.size() - 1];
  }
  
  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }
  
  markDoneAt(index) {
    this.itemAt(index).markDone();
  }
  
  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }
  
  isDone() {
    return this.todos.every(todo => todo.isDone());
  }
  
  shift() {
    return this.todos.shift();
  }
  
  pop() {
    return this.todos.pop();
  }
  
  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }
  
  toString() {
    let title = `--- ${this.title} ---`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }
  
  forEach(callback) {
    this.todos.forEach(todo => callback(todo));
  }
  
  filter(callback, title) {
    let qualifies = new TodoList(title);
    this.forEach(todo => {
      if(callback(todo)) {
        qualifies.add(todo);
      }
    });
    
    return qualifies;
  }
  
  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }
  
  allDone() {
    return this.filter(todo => todo.isDone(), "Completed");
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone(), "Not Completed")
  }
  
  markDone(title) {
    let completedItem = this.findByTitle(title);
    if (completedItem !== undefined) {
      completedItem.markDone();
    }
  }
  
  markAllDone() {
    this.forEach(todo => {
      todo.markDone();
    });
  }
  
  markAllUndone() {
    this.forEach(todo => {
      todo.markUndone();
    });
  }
  
  toArray() {
    return this.todos.slice(0);
  }
  
  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);


console.log(list.toArray());