import { createTRPCRouter, protectedProcedure } from '../trpc';
import z from 'zod';
import { leaveRoom } from 'server/services/rooms/leave';
import { observable } from '@trpc/server/observable';
import { roomEventsChannel } from 'server/services/events/event-channel';
import { RoomEvents } from 'server/services/events/room-events';
import { Room } from 'server/services/datastore/types';

export const eventRouter = createTRPCRouter({
  stream: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx: { identity }, input: { roomId } }) => {
      return observable<Room>((emit) => {
        const push = (data: Room) => {
          emit.next(data);
        };

        roomEventsChannel.on(RoomEvents.Join, push);
        roomEventsChannel.on(RoomEvents.Leave, push);
        roomEventsChannel.on(RoomEvents.Voted, push);
        roomEventsChannel.on(RoomEvents.Reveal, push);
        roomEventsChannel.on(RoomEvents.Reset, push);

        return () => {
          try {
            roomEventsChannel.off(RoomEvents.Join, push);
            roomEventsChannel.off(RoomEvents.Leave, push);
            roomEventsChannel.off(RoomEvents.Voted, push);
            roomEventsChannel.off(RoomEvents.Reveal, push);
            roomEventsChannel.off(RoomEvents.Reset, push);
            leaveRoom({ roomId, user: identity });
          } catch {}
        };
      });
    }),
});
