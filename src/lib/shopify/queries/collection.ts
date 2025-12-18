export const COLLECTIONS_QUERY = `
#graphql
query ListCollections(
  $first: Int
  $last: Int
  $after: String
  $before: String
  $query: String
  $sortKey: CollectionSortKeys
  $reverse: Boolean
) {
  collections(
    first: $first
    last: $last
    after: $after
    before: $before
    query: $query
    sortKey: $sortKey
    reverse: $reverse
  ) {
    edges {
      cursor
      node {
        id
        handle
        title
        description
        image {
          url
          altText
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
`