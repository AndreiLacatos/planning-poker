import { Button, message } from 'antd';
import { api } from '~/react';
import { useRoomStore } from '~/store/room';

const Reveal = () => {
  const { room } = useRoomStore();
  const { mutateAsync } = api.votes.reveal.useMutation();

  if (!room) {
    return;
  }
  const handleReveal = async () => {
    try {
      await mutateAsync({ roomId: room.id });
    } catch {
      message.error('Could not reveal votes!');
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleReveal}
      size="large"
      disabled={room.state !== 'voting'}
    >
      Reveal
    </Button>
  );
};

export default Reveal;
