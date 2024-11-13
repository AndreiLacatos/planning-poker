import { Flex, message, Spin } from 'antd';
import { useEffect } from 'react';
import { api } from '~/react';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from '@remix-run/react';
import PokerRoom from './PokerRoom';

interface PropTypes {
  roomId: string;
}

const PokerLobby = ({ roomId }: PropTypes) => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading, error, isSuccess } =
    api.rooms.join.useMutation();

  useEffect(() => {
    void mutateAsync({ roomId });
  }, [mutateAsync]);

  useEffect(() => {
    if (error?.data?.code === 'NOT_FOUND') {
      message.error('Room not found!');
      navigate('/');
      return;
    }
    if (!!error?.data?.code && error.data.code !== 'BAD_REQUEST') {
      // backend throws BAD_REQUEST if the user is already in the room
      // that is ignored, otherwise throw unknown error
      message.error('Unknown error!');
      navigate('/');
    }
  }, [error?.data?.code]);

  if (isLoading) {
    return (
      <Flex align="center">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </Flex>
    );
  }

  if (isSuccess || (error?.data?.code && error.data.code === 'BAD_REQUEST')) {
    return <PokerRoom roomId={roomId} />;
  }
};

export default PokerLobby;
