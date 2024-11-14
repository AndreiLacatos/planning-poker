import { Button } from '~/components/ui/button';
import { toaster } from '~/components/ui/toaster';
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
      toaster.error({ title: 'Could not reveal votes!' });
    }
  };

  return (
    <Button onClick={handleReveal} disabled={room.state !== 'voting'}>
      Reveal
    </Button>
  );
};

export default Reveal;
