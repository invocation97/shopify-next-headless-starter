export const STORE_BRANDING_QUERY = `
#graphql
 query GetStoreBranding {
    shop {
      name
      brand {
        slogan
        shortDescription
        colors {
          primary {
            background
            foreground
          }
          secondary {
            background
            foreground
          }
        }
        logo {
          image {
            url
            altText
          }
        }
        squareLogo {
          image {
            url
            altText
          }
        }
        coverImage {
          image {
            url
            altText
          }
        }
      }
    }
  }
`