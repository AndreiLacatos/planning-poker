import { Vote } from 'server/services/datastore/types';
import BaseVoteCard from './BaseVoteCard';
import { TbCoffee } from 'react-icons/tb';
import { Text } from '@chakra-ui/react';

interface PropTypes {
  vote: Vote | undefined;
}

const VoteRevealed = ({ vote }: PropTypes) => {
  let voteElement: React.ReactNode = <></>;
  if (vote) {
    if (vote.value) {
      voteElement = (
        <Text fontSize="1.8rem" fontWeight={600}>
          {vote.value}
        </Text>
      );
    } else {
      voteElement = <TbCoffee size="32" />;
    }
  } else {
    voteElement = (
      <Text fontSize="1.8rem" fontWeight={600}>
        -
      </Text>
    );
  }
  return <BaseVoteCard color="#e7e7e7">{voteElement}</BaseVoteCard>;
};

export default VoteRevealed;
