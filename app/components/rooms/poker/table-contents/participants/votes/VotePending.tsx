import BaseVoteCard from './BaseVoteCard';
import { IconBrain } from '@tabler/icons-react';

const VotePending = () => {
  return (
    <BaseVoteCard color="#5a8cdb">
      <IconBrain stroke={2} color="white" size="32" />
    </BaseVoteCard>
  );
};

export default VotePending;
