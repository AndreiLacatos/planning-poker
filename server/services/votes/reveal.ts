import { update } from '../datastore/datastore';
import { Room, User } from '../datastore/types';
import { roomEventsChannel } from '../events/event-channel';
import { RoomEvents } from '../events/room-events';
import { NotParticipantError } from '../rooms/errors/NotParticipant';
import { getRoom } from '../rooms/get';
import { NotVotingError } from './errors/NotVoting';

interface RevealVoteOptions {
  user: User;
  roomId: string;
}

export const reveal = ({ roomId, user }: RevealVoteOptions): Room => {
  const room = getRoom(roomId);

  if (!room.participants.some(({ userId }) => userId === user.userId)) {
    throw new NotParticipantError(user.userId, roomId);
  }

  if (room.state !== 'voting') {
    throw new NotVotingError(roomId);
  }

  room.state = 'revealed';

  update(room);
  roomEventsChannel.emit(RoomEvents.Reveal, room);
  return room;
};
