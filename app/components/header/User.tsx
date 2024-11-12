import { Typography } from 'antd';
import { useAuth } from '~/auth/AuthProvider';

const User = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Typography.Text style={{ color: '#FFF', fontSize: '1.6rem' }}>
      Hello {user.userName}!
    </Typography.Text>
  );
};

export default User;
