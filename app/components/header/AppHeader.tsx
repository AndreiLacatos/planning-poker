import { Flex } from '@chakra-ui/react';
import User from './User';

const AppHeader = () => {
  return (
    <Flex
      justify="flex-end"
      align="center"
      style={{ height: '100%' }}
      background="blue.700"
      padding="6"
      shadow="md"
    >
      <User />
    </Flex>
  );
};

export default AppHeader;
