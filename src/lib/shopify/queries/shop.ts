export const SHOP_QUERY = `#graphql
  query ShopQuery {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;
