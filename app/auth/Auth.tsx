import axios from 'axios';
import { useState } from 'react';

const Auth = () => {
  const [name, setName] = useState('');
  const authenticate = () => axios.post('/auth', { userName: name });
  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={authenticate}>Auth</button>
    </>
  );
};

export default Auth;
