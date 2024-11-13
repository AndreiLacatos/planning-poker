import { MetaFunction } from '@remix-run/react';
import { Card, Flex } from 'antd';
import CreateRoomTrigger from '~/components/rooms/create/CreateRoomTrigger';
import JoinRoomTrigger from '~/components/rooms/join/JoinRoomTrigger';

export const meta: MetaFunction = () => {
  return [{ title: 'Planning Poker' }];
};

export default function Index() {
  return (
    <Card
      style={{
        width: '35%',
        padding: '4rem',
        boxSizing: 'border-box',
      }}
    >
      <Flex
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <JoinRoomTrigger />
        <CreateRoomTrigger />
      </Flex>
    </Card>
  );
}
