import { Typography } from 'antd';
import { useRoomStore } from '~/store/room';

const Revealed = () => {
  const { room } = useRoomStore();
  if (!room) {
    return null;
  }

  let isConsensus = room.votes.reduce((acc, { value }) => {
    return acc && value === room.votes[0].value;
  }, true);
  return (
    <Typography.Text
      style={{ color: 'white', fontWeight: 600, fontSize: '1.4rem' }}
    >
      {isConsensus && 'Consensus!'}
    </Typography.Text>
  );
};

export default Revealed;
