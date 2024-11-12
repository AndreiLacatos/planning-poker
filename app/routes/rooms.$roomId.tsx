import PokerRoom from '~/components/rooms/poker/PokerRoom';
import { useParams } from '@remix-run/react';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  return <PokerRoom roomId={roomId!} />;
};

export default Room;
