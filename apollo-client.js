import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clhjiykm62wrg01t96ci97vy1/master',
  cache: new InMemoryCache(),
});

export default client;
