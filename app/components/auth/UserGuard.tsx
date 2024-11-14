import { useAuth } from '~/auth/AuthProvider';
import LoginForm from './LoginForm';
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogRoot,
} from '../ui/dialog';

const UserGuard = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  if (user) {
    return <>{children}</>;
  }

  return (
    <DialogRoot
      size="md"
      placement="center"
      motionPreset="slide-in-bottom"
      unmountOnExit
      closeOnEscape={false}
      closeOnInteractOutside={false}
      defaultOpen
    >
      <DialogBackdrop background="gray.200" />
      <DialogContent>
        <DialogBody>
          <LoginForm />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default UserGuard;
