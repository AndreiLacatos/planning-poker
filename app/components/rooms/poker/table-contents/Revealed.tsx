import { useRoomStore } from '~/store/room';
import { Text } from '@chakra-ui/react';

const Revealed = () => {
  const { room } = useRoomStore();
  if (!room) {
    return null;
  }

  let isConsensus = room.votes.reduce((acc, { value }) => {
    return acc && value === room.votes[0].value;
  }, true);
  return (
    <Text style={{ color: 'white', fontWeight: 600, fontSize: '1.4rem' }}>
      {isConsensus && 'Consensus!'}
    </Text>
  );
};

export default Revealed;
