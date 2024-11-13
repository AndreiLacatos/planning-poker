import { Button, message } from 'antd';
import { api } from '~/react';
import { useRoomStore } from '~/store/room';

const Reset = () => {
  const { room } = useRoomStore();
  const { mutateAsync } = api.votes.reset.useMutation();

  if (!room) {
    return;
  }
  const handleReset = async () => {
    try {
      await mutateAsync({ roomId: room.id });
    } catch {
      message.error('Could not reset votes!');
    }
  };

  return (
    <Button
      onClick={handleReset}
      size="large"
      disabled={room.state !== 'revealed'}
    >
      Reset
    </Button>
  );
};

export default Reset;
