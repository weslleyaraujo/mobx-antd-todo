// @flow
import React from 'react';
import { List, Tooltip } from 'antd';

import { type Todo } from '../todo-store';

function Todos({
  onDoubleClick,
  dataSource
}: {
  onDoubleClick: (...args: any) => void,
  dataSource: Array<Todo>
}) {
  return (
    <List
      bordered
      dataSource={dataSource}
      renderItem={todo => (
        <List.Item
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            textDecoration: todo.status === 'done' ? 'line-through' : 'none'
          }}
          onDoubleClick={event => {
            event.preventDefault();
            onDoubleClick(todo);
          }}
        >
          <Tooltip title="Double click to change status">{todo.text}</Tooltip>
        </List.Item>
      )}
    />
  );
}

export default Todos;
