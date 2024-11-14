import { Button } from '~/components/ui/button';
import { toaster } from '~/components/ui/toaster';
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
      toaster.error({ title: 'Could not reset votes!' });
    }
  };

  return (
    <Button
      onClick={handleReset}
      variant="outline"
      disabled={room.state !== 'revealed'}
    >
      Reset
    </Button>
  );
};

export default Reset;
