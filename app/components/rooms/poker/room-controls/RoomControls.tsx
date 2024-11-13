import { Flex } from 'antd';
import Reset from './Reset';
import Reveal from './Reveal';
import Invite from './Invite';

const RoomControls = () => {
  return (
    <Flex
      style={{
        flexDirection: 'column',
        gap: '2rem',
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '2rem',
      }}
    >
      <Invite />
      <Reset />
      <Reveal />
    </Flex>
  );
};

export default RoomControls;
