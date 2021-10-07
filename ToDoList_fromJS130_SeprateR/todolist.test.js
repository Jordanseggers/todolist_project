const Todo = require('./todo.js');
const TodoList = require('./todolist.js');

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
  
  // test('toArray creates and returns a copy of the todolist array', () => {
  //   expect(TodoList.todos).toEqual(TodoList.toArray());
  // });
})