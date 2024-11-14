import { api } from '~/react';
import { useRoomStore } from '~/store/room';
import { TbCoffee } from 'react-icons/tb';
import { useAuth } from '~/auth/AuthProvider';
import { Card, Flex, Text } from '@chakra-ui/react';
import { toaster } from '~/components/ui/toaster';

interface PropTypes {
  value: number | undefined;
}

const VotingCard = ({ value }: PropTypes) => {
  const { user } = useAuth();
  const { room } = useRoomStore();
  if (!room) {
    return null;
  }
  const { mutateAsync } = api.votes.vote.useMutation();

  const handleSubmitVote = async () => {
    if (room.state !== 'voting') {
      return;
    }
    try {
      await mutateAsync({ roomId: room.id, vote: value });
    } catch {
      toaster.error({ title: 'Could not submit vote!' });
    }
  };

  const userVote = room.votes.find(
    ({ user: { userId } }) => userId === user?.userId
  );
  const isSelectedVote = userVote?.value === value;

  return (
    <Card.Root
      onClick={handleSubmitVote}
      style={{
        width: '3.9rem',
        height: '6.2rem',
        background: userVote && isSelectedVote ? '#c9c9c9' : '#e7e7e7',
        border: `6px solid ${
          userVote && isSelectedVote ? '#183a70' : 'transparent'
        }`,
        position: 'relative',
        cursor: room.state === 'voting' ? 'pointer' : 'not-allowed',
        boxSizing: 'content-box',
      }}
    >
      <Flex
        width="3.9rem"
        height="6.2rem"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top={0}
        left={0}
      >
        {value ? (
          <Text fontSize="2rem" fontWeight={600}>
            {value}
          </Text>
        ) : (
          <TbCoffee size="38" />
        )}
      </Flex>
    </Card.Root>
  );
};

export default VotingCard;
