import { Room, update } from './datastore';
import { AlreadyJoinedError } from './errors/AlreadyJoined';
import { getRoom } from './get';
import { RoomEvents } from './events/room-events';
import { roomEventsChannel } from './events/event-channel';

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
  roomEventsChannel.emit(RoomEvents.Join, room);
  return room;
};
