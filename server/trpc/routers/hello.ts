import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import EventEmitter from 'events';
import { observable } from '@trpc/server/observable';

const ee = new EventEmitter();

export const helloRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return 'Hello';
  }),
  name: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.identity.userName}`;
  }),
  sub: publicProcedure.subscription(() => {
    // return an `observable` with a callback which is triggered immediately
    return observable<string>((emit) => {
      const onAdd = (data: string) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on('add', onAdd);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
});

setInterval(() => ee.emit('add', 1), 2000);
