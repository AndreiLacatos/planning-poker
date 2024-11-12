import { Room, update } from './datastore';
import { AlreadyJoinedError } from './errors/AlreadyJoined';
import { getRoom } from './get';

interface JoinRoomOptions {
  roomId: string;
  user: {
    userId: string;
    userName: string;
  };
}

export const joinRoom = ({ roomId, user }: JoinRoomOptions): Room => {
  const room = getRoom(roomId);

  if (room.participants.some(({ userId }) => userId === user.userId)) {
    throw new AlreadyJoinedError(user.userId, roomId);
  }

  room.participants.push(user);
  update(room);
  return room;
};
