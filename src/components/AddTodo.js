// @flow
import React, { Fragment } from "react";
import yup from "yup";
import { Box } from "grid-styled";
import { Formik } from "formik";
import { Input } from "antd";
import { Col, Row, Button } from "antd";

type Validation = ?{ [key: string]: string } | {};

const schema: (...args: any) => Validation = yup.object().shape({
  text: yup
    .string()
    .min(4, "Too short.")
    .required("Required.")
});

function AddTodo({ onSubmit }: { onSubmit: (...args: any) => any }) {
  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={schema}
      onSubmit={onSubmit}
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
            <div className={errors.text ? "has-error" : ""}>
              <Input
                value={values.text}
                onChange={handleChange}
                name="text"
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.text &&
              errors.text && (
                <div className="ant-form-explain">{errors.text}</div>
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
  );
}

AddTodo.defaultProps = {
  onSubmit: () => {}
};

export default AddTodo;
