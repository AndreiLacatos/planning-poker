import { Flex } from 'antd';
import User from './User';

const AppHeader = () => {
  return (
    <Flex justify="flex-end" align="center" style={{ height: '100%' }}>
      <User />
    </Flex>
  );
};

export default AppHeader;
