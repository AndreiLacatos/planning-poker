import { User } from 'server/services/datastore/types';
import { useAuth } from '~/auth/AuthProvider';
import { useRoomStore } from '~/store/room';
import VoteRevealed from './votes/VoteRevealed';
import Voted from './votes/Voted';
import VotePending from './votes/VotePending';
import { Text, Flex } from '@chakra-ui/react';

interface PropTypes {
  participant: User;
}

const Participant = ({ participant }: PropTypes) => {
  const { user } = useAuth();
  const { room } = useRoomStore();
  if (!room) {
    return null;
  }

  const vote = room.votes.find(
    ({ user: { userId } }) => userId === participant.userId
  );
  let card: React.ReactNode | null = null;
  switch (room.state) {
    case 'revealed':
      card = <VoteRevealed vote={vote} />;
      break;
    case 'voting':
      card = vote ? <Voted /> : <VotePending />;
      break;
  }

  return (
    <Flex flexDirection="column" gap=".6rem" alignItems="center">
      {card}
      <Text>
        {participant.userId === user?.userId ? 'You' : participant.userName}
      </Text>
    </Flex>
  );
};

export default Participant;
