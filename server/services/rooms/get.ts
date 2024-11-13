import { get } from '../datastore/datastore';
import { Room } from '../datastore/types';
import { RoomNotFoundError } from './errors/RoomNotFound';

export const getRoom = (roomId: string): Room => {
  const room = get(roomId);
  if (!room) {
    throw new RoomNotFoundError(roomId);
  }
  return room;
};
