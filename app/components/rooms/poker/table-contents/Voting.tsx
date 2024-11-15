import { useRoomStore } from '~/store/room';
import { Text } from '@chakra-ui/react';

const Voting = () => {
  const { room } = useRoomStore();
  if (!room) {
    return null;
  }
  const remainingVotes = room.participants.length - room.votes.length;
  return (
    <Text color="white" fontSize="1.4rem" fontWeight={600}>
      Waiting for {remainingVotes} {remainingVotes === 1 ? 'vote' : 'votes'}
    </Text>
  );
};

export default Voting;
