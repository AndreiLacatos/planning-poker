import { Card, Flex, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { api } from '~/react';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';

interface PropTypes {
  roomId: string;
}

const PokerRoom = ({ roomId }: PropTypes) => {
  const navigate = useNavigate();
  const { isLoading, data, error } = api.rooms.fetch.useQuery({
    roomId,
  });

  useEffect(() => {
    if (error?.data?.code === 'NOT_FOUND') {
      message.error('Room not found!');
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

  return (
    <>
      <Card style={{ width: '90%', height: '44rem' }}>
        Poker room: {data?.name}
      </Card>
    </>
  );
};

export default PokerRoom;
