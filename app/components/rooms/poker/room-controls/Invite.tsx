import { Button, message } from 'antd';

const Invite = () => {
  const handleInvite = () => {
    navigator.clipboard
      .writeText(window.location.toString())
      .then(() => message.info('Invitation link copied!'))
      .catch(() => message.error('Could not copy invitation link!'));
  };
  return (
    <Button size="large" onClick={handleInvite}>
      Invite
    </Button>
  );
};

export default Invite;
