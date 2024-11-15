import { useEffect } from 'react';
import { api } from '~/react';
import { useNavigate } from '@remix-run/react';
import PokerRoom from './PokerRoom';
import { toaster } from '~/components/ui/toaster';
import { Flex, Spinner } from '@chakra-ui/react';

interface PropTypes {
  roomId: string;
}

const PokerLobby = ({ roomId }: PropTypes) => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading, error, isSuccess } =
    api.rooms.join.useMutation();

  useEffect(() => {
    void mutateAsync({ roomId });
  }, [mutateAsync, roomId]);

  useEffect(() => {
    if (error?.data?.code === 'NOT_FOUND') {
      toaster.error({ title: 'Room not found!' });
      navigate('/');
      return;
    }
    if (!!error?.data?.code && error.data.code === 'BAD_REQUEST') {
      // backend throws BAD_REQUEST if the user is already in the room
      // that is ignored, otherwise throw unknown error
      if (error.message.includes('has already joined room')) {
        return;
      }

      toaster.error({ title: 'Unknown error!' });
      navigate('/');
    }
  }, [error?.data?.code, navigate, error?.message]);

  if (isLoading) {
    return (
      <Flex align="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (isSuccess || (error?.data?.code && error.data.code === 'BAD_REQUEST')) {
    return <PokerRoom roomId={roomId} />;
  }
};

export default PokerLobby;
