import { useParams } from '@remix-run/react';
import PokerLobby from '~/components/rooms/poker/PokerLobby';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  return <PokerLobby roomId={roomId!} />;
};

export default Room;
