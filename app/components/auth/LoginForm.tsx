import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { Button } from '../ui/button';

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
      <Box
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
        />
        <Text color="red">{form.errors.userName}</Text>
      </Box>
      <Flex justify="flex-end">
        <Button
          type="submit"
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
