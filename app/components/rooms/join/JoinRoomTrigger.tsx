import { Button } from 'antd';
import { useState } from 'react';
import JoinRoomModal from './JoinRoomModal';

const JoinRoomTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
        Join room
      </Button>
      <JoinRoomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default JoinRoomTrigger;
