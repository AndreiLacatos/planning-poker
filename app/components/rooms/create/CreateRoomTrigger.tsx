import { Button, Modal } from 'antd';
import { useState } from 'react';
import CreateRoomModal from './CreateRoomModal';

const CreateRoomTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button size="large" onClick={() => setIsOpen(true)}>
        Create room
      </Button>
      <CreateRoomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CreateRoomTrigger;
