export class NotRevealedError extends Error {
  constructor(roomId: string) {
    super(`Room ${roomId} is not currently revealed!`);
  }
}
