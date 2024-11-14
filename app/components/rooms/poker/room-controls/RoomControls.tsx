import Reset from './Reset';
import Reveal from './Reveal';
import Invite from './Invite';
import { Flex } from '@chakra-ui/react';

const RoomControls = () => {
  return (
    <Flex
      flexDirection="column"
      gap="2rem"
      right={0}
      padding="2rem"
      top={0}
      position="absolute"
    >
      <Invite />
      <Reset />
      <Reveal />
    </Flex>
  );
};

export default RoomControls;
