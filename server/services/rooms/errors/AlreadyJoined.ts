export class AlreadyJoinedError extends Error {
  constructor(userId: string, roomId: string) {
    super(`User ${userId} has already joined room ${roomId}`);
  }
}
