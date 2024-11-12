import { Button, Col, Flex, Input, Typography } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const LoginForm = () => {
  const form = useFormik({
    initialValues: {
      userName: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('User name is required')
        .min(3, 'User name must be at least 3 characters')
        .max(25, 'User name must less than 25 characters'),
    }),
    onSubmit: (values) => axios.post('/auth', values),
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      style={{
        paddingBlock: '2rem',
      }}
    >
      <Col
        style={{
          paddingBlock: '1rem',
        }}
      >
        <Input
          placeholder="Username"
          id="userName"
          name="userName"
          value={form.values.userName}
          onChange={form.handleChange}
          size="large"
          prefix={<UserOutlined />}
          status={form.isValid ? undefined : 'error'}
        />
        <Typography.Text type="danger">{form.errors.userName}</Typography.Text>
      </Col>
      <Flex justify="flex-end">
        <Button
          htmlType="submit"
          type="primary"
          loading={form.isSubmitting}
          disabled={!form.isValid}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default LoginForm;
