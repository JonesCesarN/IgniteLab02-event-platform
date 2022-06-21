import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4nkoffr05ow01xp4a713ins/master',
  cache: new InMemoryCache()
})