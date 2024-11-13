import lodash from 'lodash';
import { Room } from './types';

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

export const update = (room: Room): void => {
  rooms.set(room.id, room);
};
