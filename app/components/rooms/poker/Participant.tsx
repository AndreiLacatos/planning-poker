import { Card, Flex, Typography } from 'antd';
import { Participant as ParticipantType } from 'server/trpc/routers/rooms';
import { useAuth } from '~/auth/AuthProvider';

interface PropTypes {
  participant: ParticipantType;
}

const Participant = ({ participant }: PropTypes) => {
  const { user } = useAuth();
  return (
    <Flex
      style={{ flexDirection: 'column', gap: '.6rem', alignItems: 'center' }}
    >
      <Card
        style={{ width: '3.4rem', height: '5.7rem', background: '#e7e7e7' }}
      ></Card>
      <Typography.Text>
        {participant.userId === user?.userId ? 'You' : participant.userName}
      </Typography.Text>
    </Flex>
  );
};

export default Participant;