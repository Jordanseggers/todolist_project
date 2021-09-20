const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;
  
  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');
    
    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });
  
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });
  
  test('toArray creates and returns a copy of the todolist array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });
  
  test('calling first returns the first todo', () => {
    expect(list.first()).toEqual(todo1);
  });
  
  test('calling last returns the last todo', () => {
    expect(list.last()).toEqual(todo3);
  });
  
  test('calling shift removes and returns the first todo item', () => {
    let todo = list.shift();
    expect(todo).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });
  
  test('calling pop removes and returns the last item', () => {
    let todo = list.pop();
    expect(todo).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });
  
  test('calling isDone returns true when all items are done and false otherwise', () => {
    expect(list.isDone()).toBe(false);
    // list.pop();
    // list.pop();
    // list.pop();
    // expect(list.isDone()).toBe(true);
  });
  
  test('a TypeError will occur when we try to add a non-todo item to the lsit', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
  });
  
  test('calling itemAt returns item at index specified or ReferenceError', () => {
    expect(list.itemAt(2)).toBe(todo3);
    expect(list.itemAt(1)).toBe(todo2);
    expect(list.itemAt(0)).toBe(todo1);
    expect(() => list.itemAt(4)).toThrow(ReferenceError);
  });
  
  test('calling markDoneAt marks the todo as done or returns ReferenceError', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
  });
  
  test('calling markUndoneAt marks the todo as undone or returns ReferenceError', () => {
    list.markDoneAt(1);
    expect(todo2.isDone()).toBe(true);
    list.markUndoneAt(1);
    expect(todo2.isDone()).toBe(false);
    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
  });
  
  test('calling markAllDone marks all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });
  
  test('calling removeAt removes a todo or raises a ReferenceError', () => {
    list.removeAt(0);
    expect(list.toArray()).toEqual([todo2, todo3]);
    expect(() => list.removeAt(8)).toThrow(ReferenceError);
  });
  
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });
  
  test('toString returns string representation of the list', () => {
    list.markDoneAt(0);
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });
  
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });
  
  test('forEach iterates over each todo', () => {
    let allElements = [];
    list.forEach(todo => allElements.push(todo));
    expect(allElements).toEqual([todo1, todo2, todo3]);
  });
  
  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);
  
    expect(newList.title).toBe(list.title);
  
    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
})