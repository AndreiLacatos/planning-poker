import { Vote } from 'server/services/datastore/types';
import BaseCard from './BaseCard';
import { Typography } from 'antd';
import { IconCoffee } from '@tabler/icons-react';

interface PropTypes {
  vote: Vote | undefined;
}

const VoteRevealed = ({ vote }: PropTypes) => {
  let voteElement: React.ReactNode = <></>;
  if (vote) {
    if (vote.value) {
      voteElement = (
        <Typography.Text style={{ fontSize: '1.8rem', fontWeight: 600 }}>
          {vote.value}
        </Typography.Text>
      );
    } else {
      voteElement = <IconCoffee stroke={2} size="32" />;
    }
  } else {
    voteElement = (
      <Typography.Text style={{ fontSize: '1.8rem', fontWeight: 600 }}>
        -
      </Typography.Text>
    );
  }
  return <BaseCard color="#e7e7e7">{voteElement}</BaseCard>;
};

export default VoteRevealed;
