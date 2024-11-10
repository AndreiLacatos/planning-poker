import { api } from '~/react';

const Mock = () => {
  const { isLoading, data } = api.hello.hello.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data}</div>;
};

export default Mock;
