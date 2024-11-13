import { Room, update } from './datastore';
import { NotParticipantError } from './errors/NotParticipant';
import { roomEventsChannel } from './events/event-channel';
import { RoomEvents } from './events/room-events';
import { getRoom } from './get';

interface LeaveRoomOptions {
  roomId: string;
  user: {
    userId: string;
    userName: string;
  };
}

export const leaveRoom = ({ roomId, user }: LeaveRoomOptions): Room => {
  const room = getRoom(roomId);

  if (!room.participants.some(({ userId }) => userId === user.userId)) {
    throw new NotParticipantError(user.userId, roomId);
  }

  room.participants = room.participants.filter(
    ({ userId }) => userId !== user.userId
  );
  room.votes = room.votes.filter(
    ({ user: { userId } }) => userId !== user.userId
  );
  room.state = room.participants.length === 0 ? 'voting' : room.state;

  update(room);
  roomEventsChannel.emit(RoomEvents.Leave, room);
  return room;
};
