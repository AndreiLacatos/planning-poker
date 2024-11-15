import { Card, Flex } from '@chakra-ui/react';
import CreateRoomTrigger from '~/components/rooms/create/CreateRoomTrigger';
import JoinRoomTrigger from '~/components/rooms/join/JoinRoomTrigger';

export default function Index() {
  return (
    <Card.Root
      width={{ base: '95%', lg: '65%', xl: '40%' }}
      background="white"
      borderRadius="2rem"
      paddingInline="2rem"
      paddingBlock={{ base: '2rem', md: '4rem' }}
      borderWidth={0}
      shadow="xl"
    >
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        gap="2rem"
        alignItems="center"
        justifyContent="center"
      >
        <JoinRoomTrigger />
        <CreateRoomTrigger />
      </Flex>
    </Card.Root>
  );
}
