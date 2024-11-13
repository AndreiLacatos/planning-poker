import { add } from '../datastore/datastore';
import { v4 as uuid } from 'uuid';
import { User, Room } from '../datastore/types';

interface CreateRoomOptions {
  name: string;
  user: User;
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
