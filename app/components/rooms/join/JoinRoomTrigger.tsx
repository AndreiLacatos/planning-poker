import { Button } from '~/components/ui/button';
import { Text } from '@chakra-ui/react';
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '~/components/ui/dialog';
import JoinRoomModalContent from './JoinRoomModalContent';

const JoinRoomTrigger = () => {
  return (
    <DialogRoot
      size="md"
      placement="center"
      motionPreset="slide-in-bottom"
      unmountOnExit
    >
      <DialogTrigger asChild>
        <Button>
          <Text>Join room</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody>
          <JoinRoomModalContent />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default JoinRoomTrigger;
