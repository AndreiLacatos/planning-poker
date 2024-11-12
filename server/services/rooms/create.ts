import { add, Room } from './datastore';
import { v4 as uuid } from 'uuid';

interface CreateRoomOptions {
  name: string;
  user: {
    userId: string;
    userName: string;
  };
}

export const createRoom = ({ name, user }: CreateRoomOptions): Room => {
  const room: Room = {
    id: uuid(),
    name,
    createdBy: user,
    participants: [user],
    state: 'voting',
    votes: [],
  };

  add(room);
  return room;
};
