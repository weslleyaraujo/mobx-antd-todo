// @flow
import { decorate, observable, action, computed } from "mobx";

type Status = "done" | "";

export type Todo = {
  text: string,
  id: string,
  status: Status
};

type TodosType = Array<Todo>;

type addTodo = { text: string, id: string };
type setStatus = { id: string, status: Status };

export type Props = {
  filter: Status,
  todos: TodosType
};

export type Store = Props & {
  reset: () => void,
  addTodo: addTodo => void,
  setFilter: Status => void,
  setStatus: setStatus => void,
  count: number,
  filtered: TodosType
};

export const Todos = decorate(
  class {
    filter = "";
    todos = [];

    get count(): number {
      return this.todos.length;
    }

    get filtered(): Array<Todo> {
      const { filter } = this;
      if (!Boolean(filter)) {
        return this.todos;
      }

      return this.todos.filter(s => s.status === filter);
    }

    reset(): void {
      this.filter = "";
      this.todos = [];
    }

    addTodo({ text, id }: addTodo) {
      this.todos.push({ id, text, status: "" });
    }

    setFilter(type: Status) {
      this.filter = type;
    }

    setStatus({ id, status }: setStatus) {
      this.todos = this.todos.map(todo => ({
        ...todo,
        status: todo.id === id ? status : todo.status
      }));
    }
  },
  {
    filter: observable,
    todos: observable,
    count: computed,
    filtered: computed,
    reset: action,
    addTodo: action,
    setFilter: action,
    setStatus: action
  }
);

const todos = new Todos();

export default todos;
