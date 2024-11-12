import { useNavigate } from '@remix-run/react';
import { Button, Flex, Input, Modal } from 'antd';
import { useState } from 'react';

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const JoinRoomModal = ({ isOpen, onClose }: PropTypes) => {
  const [roomId, setRoomId] = useState('');

  const navigate = useNavigate();
  const handleJoin = () => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <Modal open={isOpen} footer={null} onClose={onClose} closeIcon={null}>
      <Input
        style={{ marginBlock: '2rem' }}
        placeholder="Room Id"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        size="large"
      />

      <Flex justify="flex-end" gap="1.6rem">
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" disabled={!roomId} onClick={handleJoin}>
          Join
        </Button>
      </Flex>
    </Modal>
  );
};

export default JoinRoomModal;
