import { Typography } from 'antd';
import { useRoomStore } from '~/store/room';

const Voting = () => {
  const { room } = useRoomStore();
  if (!room) {
    return null;
  }
  let remainingVotes = room.participants.length - room.votes.length;
  return (
    <Typography.Text
      style={{ color: 'white', fontSize: '1.4rem', fontWeight: 600 }}
    >
      Waiting for {remainingVotes} {remainingVotes === 1 ? 'vote' : 'votes'}
    </Typography.Text>
  );
};

export default Voting;
