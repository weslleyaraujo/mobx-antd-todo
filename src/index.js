import React, { Fragment } from 'react';
import { observable } from 'mobx';
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
import Yup from 'yup';

import './styles.css';
import 'antd/dist/antd.css';

// TODO: add flow

const schema = Yup.object().shape({
  text: Yup.string()
    .min(4, 'Too short.')
    .required('Required.')
});

const store = observable({
  filter: '',
  todos: [],
  addTodo({ text, id }) {
    store.todos.push({ id, text, status: '' });
  },
  setFilter(type) {
    store.filter = type;
  },
  setStatus({ id, status }) {
    store.todos = store.todos.map(todo => ({
      ...todo,
      status: todo.id === id ? status : todo.status
    }));
  },
  get count() {
    return store.todos.length;
  },
  get filtered() {
    const { filter } = store;
    if (!Boolean(filter)) {
      return store.todos;
    }

    return store.todos.filter(s => s.status === filter);
  }
});

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
                  {/* TODO: move it to store */}
                  <List
                    bordered
                    dataSource={store.filtered}
                    renderItem={todo => (
                      <List.Item
                        style={{
                          cursor: 'pointer',
                          textDecoration:
                            todo.status === 'done' ? 'line-through' : 'none'
                        }}
                        onDoubleClick={event => {
                          event.preventDefault();
                          const { id } = todo;
                          store.setStatus({ id, status: 'done' });
                        }}
                      >
                        <Tooltip title="Double click to mark as done">
                          {todo.text}
                        </Tooltip>
                      </List.Item>
                    )}
                  />
                </Box>
              )}
              <Box py={2}>
                <Formik
                  initialValues={{ text: '' }}
                  validationSchema={schema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    await sleep();
                    store.addTodo({ text: values.text, id: +new Date() });
                    setSubmitting(false);
                    resetForm();
                  }}
                  render={({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid
                  }) => (
                    <Fragment>
                      <form onSubmit={handleSubmit}>
                        <div className={errors.text ? 'has-error' : ''}>
                          <Input
                            value={values.text}
                            onChange={handleChange}
                            name="text"
                            onBlur={handleBlur}
                          />
                          {touched.text &&
                          errors.text && (
                            <div className="ant-form-explain">
                              {errors.text}
                            </div>
                          )}
                        </div>
                        <Row justify="end" type="flex">
                          <Col>
                            <Box py={3}>
                              <Button
                                htmlType="submit"
                                type="primary"
                                disabled={isSubmitting || !isValid}
                                loading={isSubmitting}
                              >
                                Add todo
                              </Button>
                            </Box>
                          </Col>
                        </Row>
                      </form>
                    </Fragment>
                  )}
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
