import BaseVoteCard from './BaseVoteCard';
import { IconGavel } from '@tabler/icons-react';
const Voted = () => {
  return (
    <BaseVoteCard color="#183a70">
      <IconGavel stroke={2} color="white" size="32" />
    </BaseVoteCard>
  );
};

export default Voted;
