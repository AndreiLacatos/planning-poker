import { useAuth } from '~/auth/AuthProvider';
import { Text } from '@chakra-ui/react';

const User = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Text fontSize="2xl" color="white">
      Hello {user.userName}!
    </Text>
  );
};

export default User;
