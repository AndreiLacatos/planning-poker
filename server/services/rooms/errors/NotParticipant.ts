export class NotParticipantError extends Error {
  constructor(userId: string, roomId: string) {
    super(`User ${userId} is not participant of room ${roomId}`);
  }
}
