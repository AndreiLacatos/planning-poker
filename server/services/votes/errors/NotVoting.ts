export class NotVotingError extends Error {
  constructor(roomId: string) {
    super(`Room ${roomId} is not currently voting!`);
  }
}
