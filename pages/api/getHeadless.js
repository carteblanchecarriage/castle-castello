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
          createdAt
          category
          instructions
          ingredients
          photo {
            url
            height
            width
          }
          slug
        }
      }
    `,
    fetchPolicy: 'no-cache',
  });

  return data.recipes;
}
