import { Card, Flex } from 'antd';

interface PropTypes extends React.PropsWithChildren {
  color: string;
}

const BaseCard = ({ color, children }: PropTypes) => {
  return (
    <Card
      style={{
        width: '3.4rem',
        height: '5.7rem',
        background: color,
        padding: '.2rem',
        position: 'relative',
      }}
    >
      <Flex
        style={{
          width: '3.4rem',
          height: '5.7rem',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </Flex>
    </Card>
  );
};

export default BaseCard;
