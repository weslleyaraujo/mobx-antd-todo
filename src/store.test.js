import { Todos } from "./store";

const makeTodo = id => ({
  id,
  text: "foo",
  status: ""
});

describe("store", () => {
  it("returns the number of todos", () => {
    const store = new Todos();
    store.addTodo(makeTodo("baz"));
    expect(store.count).toBe(1);
  });

  it("returns only filtered todos", () => {
    const store = new Todos();
    const todos = [...Array(10).keys()].map(s => makeTodo(`id_${s}`));
    todos.forEach(todo => store.addTodo(todo));
    expect(store.filtered.slice()).toEqual(todos);
  });

  it("resets store", () => {
    const store = new Todos();
    const todos = [...Array(10).keys()].map(s => makeTodo(`id_${s}`));
    todos.forEach(todo => store.addTodo(todo));
    store.reset();
    expect(store.count).toBe(0);
    expect(store.todos.slice()).toEqual([]);
    expect(store.filter).toBe("");
  });

  it("sets todos filter", () => {
    const store = new Todos();
    const filter = "done";
    store.setFilter(filter);
    expect(store.filter).toBe(filter);
  });

  it("sets a todo status", () => {
    const store = new Todos();
    const todos = [...Array(10).keys()].map(s => makeTodo(`id_${s}`));
    todos.forEach(todo => store.addTodo(todo));
    const status = "done";
    const id = "id_0";
    store.setStatus({
      id,
      status
    });

    expect(store.todos.find(s => s.id === id).status).toBe(status);
  });
});
