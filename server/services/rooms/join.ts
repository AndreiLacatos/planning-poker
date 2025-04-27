import { update } from '../datastore/datastore';
import { getRoom } from './get';
import { RoomEvents } from '../events/room-events';
import { roomEventsChannel } from '../events/event-channel';
import { User, Room } from '../datastore/types';

interface JoinRoomOptions {
  roomId: string;
  user: User;
}

export const joinRoom = ({ roomId, user }: JoinRoomOptions): Room => {
  const room = getRoom(roomId);

  if (room.participants.some(({ userId }) => userId === user.userId)) {
    return room;
  }

  room.participants.push(user);
  update(room);
  roomEventsChannel.emit(RoomEvents.Join, room);
  return room;
};
