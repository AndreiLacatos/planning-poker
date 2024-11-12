import { Button, Card, Flex } from 'antd';
import CreateRoomTrigger from '~/components/rooms/create/CreateRoomTrigger';

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
        <Button type="primary" size="large">
          Join room
        </Button>
        <CreateRoomTrigger />
      </Flex>
    </Card>
  );
}
