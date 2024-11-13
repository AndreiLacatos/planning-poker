import { update } from '../datastore/datastore';
import { Room, User } from '../datastore/types';
import { roomEventsChannel } from '../events/event-channel';
import { RoomEvents } from '../events/room-events';
import { NotParticipantError } from '../rooms/errors/NotParticipant';
import { getRoom } from '../rooms/get';
import { NotVotingError } from './errors/NotVoting';

interface SubmitVoteOptions {
  user: User;
  roomId: string;
  vote: number | undefined;
}

export const submit = ({ roomId, user, vote }: SubmitVoteOptions): Room => {
  const room = getRoom(roomId);

  if (!room.participants.some(({ userId }) => userId === user.userId)) {
    throw new NotParticipantError(user.userId, roomId);
  }

  if (room.state !== 'voting') {
    throw new NotVotingError(roomId);
  }

  const userVote = room.votes.find(
    ({ user: { userId } }) => userId === user.userId
  );

  if (userVote) {
    userVote.value = vote;
  } else {
    room.votes.push({
      user,
      value: vote,
    });
  }

  if (room.votes.length === room.participants.length) {
    room.state = 'revealed';
  }

  update(room);
  roomEventsChannel.emit(RoomEvents.Voted, room);
  return room;
};
