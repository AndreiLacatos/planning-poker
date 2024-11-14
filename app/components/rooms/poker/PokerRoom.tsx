import { api } from '~/react';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { useRoomStore } from '~/store/room';
import VotingTable from './VotingTable';
import RoomControls from './room-controls/RoomControls';
import { Card, Flex, Spinner } from '@chakra-ui/react';
import { toaster } from '~/components/ui/toaster';

interface PropTypes {
  roomId: string;
}

const PokerRoom = ({ roomId }: PropTypes) => {
  const navigate = useNavigate();
  const { isLoading, data, error } = api.rooms.fetch.useQuery({
    roomId,
  });
  const { update } = useRoomStore();
  api.events.stream.useSubscription(
    { roomId },
    {
      onData: update,
    }
  );
  useEffect(() => {
    if (error?.data?.code === 'NOT_FOUND') {
      toaster.error({ title: 'Room not found!' });
      navigate('/');
    }
  }, [error?.data?.code]);

  useEffect(() => {
    if (data) {
      update(data);
    }
    return () => {
      update(undefined);
    };
  }, [data]);

  if (isLoading) {
    return (
      <Flex align="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Card.Root
      height="44rem"
      position="relative"
      width={{ base: '95%', lg: '85%' }}
      background="white"
      borderRadius="2rem"
      paddingInline="2rem"
      paddingBlock={{ base: '2rem', md: '4rem' }}
      borderWidth={0}
      shadow="xl"
    >
      <VotingTable />
      <RoomControls />
    </Card.Root>
  );
};

export default PokerRoom;
