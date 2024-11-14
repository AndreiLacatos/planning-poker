import { Box, Flex, Input } from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { DialogActionTrigger } from '~/components/ui/dialog';

const JoinRoomModalContent = () => {
  const [roomId, setRoomId] = useState('');

  const navigate = useNavigate();
  const handleJoin = () => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <Box>
      <Input
        marginTop="6"
        placeholder="Room Id"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <Flex justify="flex-end" marginTop="6" gap="6">
        <DialogActionTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogActionTrigger>
        <Button disabled={!roomId} onClick={handleJoin}>
          Join
        </Button>
      </Flex>
    </Box>
  );
};

export default JoinRoomModalContent;
