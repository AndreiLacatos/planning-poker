export interface User {
  userId: string;
  userName: string;
}

export interface Vote {
  user: User;
  value: number | undefined;
}

export interface Room {
  id: string;
  name: string;
  createdBy: User;
  state: 'voting' | 'revealed';
  participants: User[];
  votes: Vote[];
}
