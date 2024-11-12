import { Button, Col, Flex, Input, Modal, Typography } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '~/react';

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal = ({ isOpen, onClose }: PropTypes) => {
  const { mutateAsync } = api.rooms.create.useMutation();

  const form = useFormik({
    initialValues: {
      roomName: '',
    },
    validationSchema: Yup.object({
      roomName: Yup.string()
        .required('Room name is required')
        .min(3, 'Room name must be at least 3 characters')
        .max(45, 'Room name must less than 45 characters'),
    }),
    onSubmit: ({ roomName }) => mutateAsync({ name: roomName }),
  });

  return (
    <Modal open={isOpen} footer={null} onClose={onClose} closeIcon={null}>
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
            placeholder="Room name"
            id="roomName"
            name="roomName"
            value={form.values.roomName}
            onChange={form.handleChange}
            size="large"
            status={form.isValid ? undefined : 'error'}
          />
          <Typography.Text type="danger">
            {form.errors.roomName}
          </Typography.Text>
        </Col>
        <Flex justify="flex-end" gap="1.6rem">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={form.isSubmitting}
            disabled={!form.isValid}
          >
            Create
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default CreateRoomModal;
