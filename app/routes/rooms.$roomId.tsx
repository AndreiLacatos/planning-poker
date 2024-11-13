import { MetaFunction, useParams } from '@remix-run/react';
import PokerLobby from '~/components/rooms/poker/PokerLobby';

export const meta: MetaFunction = () => {
  return [{ title: 'Planning Poker' }];
};

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  return <PokerLobby roomId={roomId!} />;
};

export default Room;
