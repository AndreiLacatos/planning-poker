import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '~/react';
import { useNavigate } from '@remix-run/react';
import { Flex, Input, Text } from '@chakra-ui/react';
import { Button } from '~/components/ui/button';
import { DialogActionTrigger } from '~/components/ui/dialog';

const CreateRoomModalContent = () => {
  const { mutateAsync } = api.rooms.create.useMutation();
  const navigate = useNavigate();

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
    onSubmit: async ({ roomName }) => {
      const { id } = await mutateAsync({ name: roomName });
      navigate(`/rooms/${id}`);
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      style={{
        paddingBlock: '2rem',
      }}
    >
      <Input
        placeholder="Room name"
        id="roomName"
        name="roomName"
        value={form.values.roomName}
        onChange={form.handleChange}
      />
      <Text color="red">{form.errors.roomName}</Text>

      <Flex justify="flex-end" marginTop="6" gap="6">
        <DialogActionTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogActionTrigger>
        <Button
          type="submit"
          loading={form.isSubmitting}
          disabled={!form.isValid}
        >
          Create
        </Button>
      </Flex>
    </form>
  );
};

export default CreateRoomModalContent;
