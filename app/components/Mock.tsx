import { api } from '~/react';

const Mock = () => {
  const { isLoading, data } = api.hello.hello.useQuery();
  api.hello.sub.useSubscription(undefined, {
    onData: console.log,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data}</div>;
};

export default Mock;
