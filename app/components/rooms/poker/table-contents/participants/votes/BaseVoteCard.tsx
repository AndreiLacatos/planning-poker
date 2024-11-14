import { Card, Flex } from '@chakra-ui/react';

interface PropTypes extends React.PropsWithChildren {
  color: string;
}

const BaseVoteCard = ({ color, children }: PropTypes) => {
  return (
    <Card.Root
      width="3.4rem"
      height="5.7rem"
      background={color}
      padding=".2rem"
      position="relative"
    >
      <Flex
        width="3.4rem"
        height="5.7rem"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={0}
        left={0}
      >
        {children}
      </Flex>
    </Card.Root>
  );
};

export default BaseVoteCard;
