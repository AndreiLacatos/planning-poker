import { Room } from 'server/services/datastore/types';
import { create } from 'zustand';

interface RoomStoreState {
  room: Room | undefined;
  update: (room: Room | undefined) => void;
}

export const useRoomStore = create<RoomStoreState>()((set) => ({
  room: undefined,
  update: (room: Room | undefined) => set(() => ({ room })),
}));
