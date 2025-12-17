export const COLLECTION_FACETS_QUERY = `
  #graphql
  query CollectionFacets($handle: String!) {
    collection(handle: $handle) {
    id
    handle
      products(first: 1) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
  }
`;