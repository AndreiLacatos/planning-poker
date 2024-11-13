import React from 'react';
import { useRoomStore } from '~/store/room';
import Voting from './Voting';
import Revealed from './Revealed';

const TableContents = () => {
  const { room } = useRoomStore();
  let content: React.ReactNode | null = null;
  switch (room?.state) {
    case 'voting':
      content = <Voting />;
      break;
    case 'revealed':
      content = <Revealed />;
      break;
  }
  return content;
};

export default TableContents;
