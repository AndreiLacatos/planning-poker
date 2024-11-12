import { Button, Card, Flex } from 'antd';

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
        <Button size="large">Create room</Button>
      </Flex>
    </Card>
  );
}
