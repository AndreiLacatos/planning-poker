import { Button } from '~/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '~/components/ui/dialog';
import CreateRoomModalContent from './CreateRoomModalContent';

const CreateRoomTrigger = () => {
  return (
    <DialogRoot
      size="md"
      placement="center"
      motionPreset="slide-in-bottom"
      unmountOnExit
    >
      <DialogTrigger asChild>
        <Button variant="outline">Create room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody>
          <CreateRoomModalContent />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateRoomTrigger;
