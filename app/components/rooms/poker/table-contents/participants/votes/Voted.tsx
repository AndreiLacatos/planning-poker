import BaseVoteCard from './BaseVoteCard';
import { TbGavel } from 'react-icons/tb';

const Voted = () => {
  return (
    <BaseVoteCard color="#183a70">
      <TbGavel stroke="white" size="32" />
    </BaseVoteCard>
  );
};

export default Voted;
