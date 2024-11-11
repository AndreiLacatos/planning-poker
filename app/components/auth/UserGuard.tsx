import { useAuth } from '~/auth/AuthProvider';
import { Modal } from 'antd';
import LoginForm from './LoginForm';

const UserGuard = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  if (user) {
    return <>{children}</>;
  }

  return (
    <Modal open={!user} closable={false} footer={null} centered>
      <LoginForm />
    </Modal>
  );
};

export default UserGuard;
