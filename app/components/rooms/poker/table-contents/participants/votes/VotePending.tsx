import BaseVoteCard from './BaseVoteCard';
import { TbBrain } from 'react-icons/tb';

const VotePending = () => {
  return (
    <BaseVoteCard color="#5a8cdb">
      <TbBrain stroke="white" color="white" size="32" />
    </BaseVoteCard>
  );
};

export default VotePending;
