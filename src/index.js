import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { render } from 'react-dom';
import {
  Layout,
  Col,
  Row,
  Card,
  Input,
  Button,
  Tooltip,
  List,
  Tag
} from 'antd';
import { Box } from 'grid-styled';
import { Formik } from 'formik';

import store from './todo-store';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import './styles.css';
import 'antd/dist/antd.css';

const sleep = (ms = 1000) => new Promise(r => setTimeout(r, ms));

const App = observer(({ store }) => (
  <Layout>
    <Box p={3}>
      <Row justify="center" span={24} type="flex">
        <Col span={24} lg={{ span: 12 }} xl={{ span: 12 }}>
          <Box px={2}>
            <Card title="Things to be done 🐜">
              {Boolean(store.count) && (
                <Box py={2}>
                  <Box pb={2}>
                    <Tag.CheckableTag
                      checked={store.filter === ''}
                      onChange={e => store.setFilter('')}
                    >
                      All
                    </Tag.CheckableTag>
                    <Tag.CheckableTag
                      checked={store.filter === 'done'}
                      onChange={e => store.setFilter('done')}
                    >
                      Done
                    </Tag.CheckableTag>
                  </Box>
                  <Todos
                    dataSource={store.filtered}
                    onDoubleClick={todo => {
                      const { id, status } = todo;
                      store.setStatus({
                        id,
                        status: status === 'done' ? '' : 'done'
                      });
                    }}
                  />
                </Box>
              )}
              <Box py={2}>
                <AddTodo
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    await sleep();
                    store.addTodo({ text: values.text, id: +new Date() });
                    setSubmitting(false);
                    resetForm();
                  }}
                />
              </Box>
            </Card>
          </Box>
        </Col>
      </Row>
    </Box>
  </Layout>
));

render(<App store={store} />, document.getElementById('root'));
