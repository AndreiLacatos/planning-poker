import Reset from './Reset';
import Reveal from './Reveal';
import Invite from './Invite';
import { Flex } from '@chakra-ui/react';

const RoomControls = () => {
  return (
    <Flex
      flexDirection={{ base: 'row', md: 'column' }}
      justifyContent="center"
      gap="2rem"
      right={0}
      padding="2rem"
      top={0}
      position={{ base: 'relative', md: 'absolute' }}
    >
      <Invite />
      <Reset />
      <Reveal />
    </Flex>
  );
};

export default RoomControls;
