import BaseCard from './BaseCard';
import { IconGavel } from '@tabler/icons-react';
const Voted = () => {
  return (
    <BaseCard color="#183a70">
      <IconGavel stroke={2} color="white" size="32" />
    </BaseCard>
  );
};

export default Voted;
