// @flow
import { observable } from 'mobx';

type Status = 'done' | '';

type Todo = {
  text: string,
  id: string,
  status: Status
};

type Store = {
  filter: string,
  todos: Array<Todo>
};

export default (): Store =>
  observable({
    filter: '',
    todos: [],

    addTodo({ text, id }: { text: string, id: string }) {
      this.todos.push({ id, text, status: '' });
    },

    setFilter(type: Status) {
      this.filter = type;
    },
    setStatus({ id, status }: { id: string, status: Status }) {
      this.todos = this.todos.map(todo => ({
        ...todo,
        status: todo.id === id ? status : todo.status
      }));
    },

    get count(): number {
      return this.todos.length;
    },

    get filtered(): Array<Todo> {
      const { filter } = this;
      if (!Boolean(filter)) {
        return this.todos;
      }

      return this.todos.filter(s => s.status === filter);
    }
  });
