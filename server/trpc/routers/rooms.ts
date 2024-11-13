import { createRoom } from 'server/services/rooms/create';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import z from 'zod';
import { getRoom } from 'server/services/rooms/get';
import { joinRoom } from 'server/services/rooms/join';
import { leaveRoom } from 'server/services/rooms/leave';
import { observable } from '@trpc/server/observable';
import { roomEventsChannel } from 'server/services/rooms/events/event-channel';
import { RoomEvents } from 'server/services/rooms/events/room-events';
import { Room } from 'server/services/rooms/datastore';

export const roomRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .query(({ input: { roomId } }) => getRoom(roomId)),
  create: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, 'Room name must be at least 3 characters long!')
          .max(45, 'Room name must not exceed 45 characters!'),
      })
    )
    .mutation(({ ctx, input }) => {
      return createRoom({ name: input.name, user: ctx.identity });
    }),
  join: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .mutation(({ input: { roomId }, ctx: { identity } }) =>
      joinRoom({ roomId, user: identity })
    ),
  events: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx: { identity }, input: { roomId } }) => {
      return observable<Room>((emit) => {
        const push = (data: Room) => {
          emit.next(data);
        };
        roomEventsChannel.on(RoomEvents.Join, push);
        roomEventsChannel.on(RoomEvents.Leave, push);
        return () => {
          try {
            roomEventsChannel.off(RoomEvents.Join, push);
            roomEventsChannel.off(RoomEvents.Leave, push);
            leaveRoom({ roomId, user: identity });
          } catch {}
        };
      });
    }),
});
