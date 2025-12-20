export const CREATE_CART_MUTATION = `
#graphql
mutation CreateCart($lines: [CartLineInput!], $attributes: [AttributeInput!]) {
  cartCreate(input: { lines: $lines, attributes: $attributes }) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            attributes {
              key
              value
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                sku
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
    warnings {
      code
      message
      target
    }
  }
}`;

export const GET_CART_QUERY = `
#graphql
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    totalQuantity
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              image {
                url
                altText
              }
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              product {
                id
                title
              }
            }
          }
        }
      }
    }
  }
}`;

export const ADD_LINES_MUTATION = `
#graphql
mutation AddLinesToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            attributes {
              key
              value
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                sku
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
    warnings {
      code
      message
      target
    }
  }
}`;

export const UPDATE_LINES_MUTATION = `
#graphql
mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            attributes {
              key
              value
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                sku
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
    warnings {
      code
      message
      target
    }
  }
}`;

export const REMOVE_LINES_MUTATION = `
#graphql
mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            attributes {
              key
              value
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                sku
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
    warnings {
      code
      message
      target
    }
  }
}`;