import { Flex } from 'antd';
import VotingCard from './VotingCard';
import { generateFibonacci } from './fibonacci-generator';

const VotingCards = () => {
  const options = generateFibonacci(7);

  return (
    <Flex style={{ gap: '1.6rem', justifyContent: 'center' }}>
      <VotingCard value={undefined} />
      {options.map((value) => (
        <VotingCard key={value} value={value} />
      ))}
    </Flex>
  );
};

export default VotingCards;
