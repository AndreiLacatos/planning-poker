import { api } from '~/react';

const Mock = () => {
  const { isLoading, data } = api.hello.name.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Name: {data}</div>;
};

export default Mock;
