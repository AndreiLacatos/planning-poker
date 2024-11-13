import { Card, Flex } from 'antd';
import { useRoomStore } from '~/store/room';
import Participant from './table-contents/participants/Participant';
import { User } from 'server/services/datastore/types';
import TableContents from './table-contents/TableContents';

const VotingTable = () => {
  const { room } = useRoomStore();

  if (!room) {
    return null;
  }

  const midpoint = Math.ceil(room.participants.length / 2);
  const topRow = room.participants.slice(0, midpoint);
  const bottomRow = room.participants.slice(midpoint);

  const mapParticipants = (participants: User[]) => {
    return participants.map((participant) => (
      <Participant key={participant.userId} participant={participant} />
    ));
  };

  return (
    <Flex
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32rem',
        gap: '2.2rem',
        flexDirection: 'column',
      }}
    >
      <Flex
        style={{ alignItems: 'center', justifyContent: 'center', gap: '4rem' }}
      >
        {mapParticipants(topRow)}
      </Flex>
      <Card style={{ background: '#426ff5', width: '18rem', height: '8rem' }}>
        <Flex
          style={{
            height: '6rem',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TableContents />
        </Flex>
      </Card>
      <Flex
        style={{ alignItems: 'center', justifyContent: 'center', gap: '4rem' }}
      >
        {mapParticipants(bottomRow)}
      </Flex>
    </Flex>
  );
};

export default VotingTable;
