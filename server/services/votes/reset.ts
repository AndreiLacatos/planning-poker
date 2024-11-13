import { update } from '../datastore/datastore';
import { Room, User } from '../datastore/types';
import { roomEventsChannel } from '../events/event-channel';
import { RoomEvents } from '../events/room-events';
import { NotParticipantError } from '../rooms/errors/NotParticipant';
import { getRoom } from '../rooms/get';
import { NotRevealedError } from './errors/NotRevealed';

interface RevealVoteOptions {
  user: User;
  roomId: string;
}

export const reset = ({ roomId, user }: RevealVoteOptions): Room => {
  const room = getRoom(roomId);

  if (!room.participants.some(({ userId }) => userId === user.userId)) {
    throw new NotParticipantError(user.userId, roomId);
  }

  if (room.state !== 'revealed') {
    throw new NotRevealedError(roomId);
  }

  room.state = 'voting';
  room.votes = [];

  update(room);
  roomEventsChannel.emit(RoomEvents.Reset, room);
  return room;
};
