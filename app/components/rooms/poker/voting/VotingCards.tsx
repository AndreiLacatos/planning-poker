import { Flex } from '@chakra-ui/react';
import VotingCard from './VotingCard';
import { generateFibonacci } from './fibonacci-generator';

const VotingCards = () => {
  const options = generateFibonacci(7);

  return (
    <Flex gap="1.6rem" justifyContent="center" wrap="wrap">
      <VotingCard value={undefined} />
      {options.map((value) => (
        <VotingCard key={value} value={value} />
      ))}
    </Flex>
  );
};

export default VotingCards;
