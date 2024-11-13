import { Card, Flex, Typography } from 'antd';
import { User } from 'server/services/datastore/types';
import { useAuth } from '~/auth/AuthProvider';
import { useRoomStore } from '~/store/room';
import VoteRevealed from './VoteRevealed';
import Voted from './Voted';
import VotePending from './VotePending';

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
    case 'voting':
      card = vote ? <Voted /> : <VotePending />;
  }

  return (
    <Flex
      style={{ flexDirection: 'column', gap: '.6rem', alignItems: 'center' }}
    >
      {card}
      <Typography.Text>
        {participant.userId === user?.userId ? 'You' : participant.userName}
      </Typography.Text>
    </Flex>
  );
};

export default Participant;
