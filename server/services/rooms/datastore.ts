import lodash from 'lodash';

interface User {
  userId: string;
  userName: string;
}

interface Vote {
  user: User;
  value: number;
}

export interface Room {
  id: string;
  name: string;
  createdBy: User;
  state: 'voting' | 'revealed';
  participants: User[];
  votes: Vote[];
}

const rooms = new Map<string, Room>();

export const add = (room: Room): void => {
  rooms.set(room.id, room);
};

export const get = (id: string): Room | undefined => {
  const room = rooms.get(id);
  if (!room) {
    return undefined;
  }

  return lodash.cloneDeep(room);
};

export const remove = (id: string): void => {
  rooms.delete(id);
};
