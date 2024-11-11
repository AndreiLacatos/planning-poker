import { useAuth } from '~/auth/AuthProvider';

export default function Something() {
  const { user } = useAuth();

  return (
    <main>
      <h1>Hello {user?.userName}</h1>
    </main>
  );
}
