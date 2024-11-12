import { create } from 'zustand';
import { type Room } from 'server/trpc/routers/rooms';

interface RoomStoreState {
  room: Room | undefined;
  update: (room: Room | undefined) => void;
}

export const useRoomStore = create<RoomStoreState>()((set) => ({
  room: undefined,
  update: (room: Room | undefined) => set(() => ({ room })),
}));
