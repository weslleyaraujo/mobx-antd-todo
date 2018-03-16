// @flow
import { observable } from 'mobx';

type Status = 'done' | '';

export type Todo = {
  text: string,
  id: string,
  status: Status
};

type Todos = Array<Todo>;

type addTodo = { text: string, id: string };
type setStatus = { id: string, status: Status };

export type Store = {
  filter: Status,
  todos: Todos,
  addTodo: addTodo => void,
  setFilter: Status => void,
  setStatus: setStatus => void,
  count: number,
  filtered: Todos
};

const store: Store = observable({
  filter: '',
  todos: [],

  get count(): number {
    return this.todos.length;
  },

  get filtered(): Array<Todo> {
    const { filter } = this;
    if (!Boolean(filter)) {
      return this.todos;
    }

    return this.todos.filter(s => s.status === filter);
  },

  addTodo({ text, id }: addTodo) {
    this.todos.push({ id, text, status: '' });
  },

  setFilter(type: Status) {
    this.filter = type;
  },
  setStatus({ id, status }: setStatus) {
    this.todos = this.todos.map(todo => ({
      ...todo,
      status: todo.id === id ? status : todo.status
    }));
  }
});

export default store;
