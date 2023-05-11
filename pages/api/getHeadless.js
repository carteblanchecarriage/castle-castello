import { gql } from '@apollo/client';
import client from '@/apollo-client';

export async function getRecipes() {
  const { data } = await client.query({
    query: gql`
      query Recipes {
        recipes {
          description
          id
          title
          photo {
            height
            width
            url
          }
          slug
        }
      }
    `,
    fetchPolicy: 'no-cache',
  });

  return data.recipes;
}
