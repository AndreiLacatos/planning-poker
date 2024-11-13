import { Flex } from 'antd';
import Reset from './Reset';
import Reveal from './Reveal';

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
      <Reset />
      <Reveal />
    </Flex>
  );
};

export default RoomControls;
