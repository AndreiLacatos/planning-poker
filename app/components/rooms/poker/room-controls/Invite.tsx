import { Button } from '~/components/ui/button';
import { toaster } from '~/components/ui/toaster';

const Invite = () => {
  const handleInvite = () => {
    navigator.clipboard
      .writeText(window.location.toString())
      .then(() => toaster.success({ title: 'Invitation link copied!' }))
      .catch(() => toaster.error({ title: 'Could not copy invitation link!' }));
  };
  return <Button onClick={handleInvite}>Invite</Button>;
};

export default Invite;
