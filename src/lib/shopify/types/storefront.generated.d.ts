/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types.d.ts';

export type ImageFragment = Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>;

export type ProductFragment = (
  Pick<StorefrontTypes.Product, 'id' | 'handle' | 'availableForSale' | 'title' | 'description' | 'descriptionHtml' | 'tags' | 'updatedAt' | 'vendor'>
  & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, compareAtPriceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, variants: { edges: Array<{ node: (
        Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>
        & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
      ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'>, collections: { nodes: Array<(
      Pick<StorefrontTypes.Collection, 'title'>
      & { products: { edges: Array<{ node: Pick<StorefrontTypes.Product, 'title' | 'vendor'> }> } }
    )> } }
);

export type SeoFragment = Pick<StorefrontTypes.Seo, 'description' | 'title'>;

export type GetStoreBrandingQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetStoreBrandingQuery = { shop: (
    Pick<StorefrontTypes.Shop, 'name'>
    & { brand?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Brand, 'slogan' | 'shortDescription'>
      & { colors: { primary: Array<Pick<StorefrontTypes.BrandColorGroup, 'background' | 'foreground'>>, secondary: Array<Pick<StorefrontTypes.BrandColorGroup, 'background' | 'foreground'>> }, logo?: StorefrontTypes.Maybe<{ image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }>, squareLogo?: StorefrontTypes.Maybe<{ image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }>, coverImage?: StorefrontTypes.Maybe<{ image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }> }
    )> }
  ) };

export type ListCollectionsQueryVariables = StorefrontTypes.Exact<{
  first?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Int']['input']>;
  last?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Int']['input']>;
  after?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
  before?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
  query?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
  sortKey?: StorefrontTypes.InputMaybe<StorefrontTypes.CollectionSortKeys>;
  reverse?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Boolean']['input']>;
}>;


export type ListCollectionsQuery = { collections: (
    Pick<StorefrontTypes.CollectionConnection, 'totalCount'>
    & { edges: Array<(
      Pick<StorefrontTypes.CollectionEdge, 'cursor'>
      & { node: (
        Pick<StorefrontTypes.Collection, 'id' | 'handle' | 'title' | 'description'>
        & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
      ) }
    )>, pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'> }
  ) };

export type CollectionFacetsQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type CollectionFacetsQuery = { collection?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Collection, 'id' | 'handle'>
    & { products: { filters: Array<(
        Pick<StorefrontTypes.Filter, 'id' | 'label' | 'type'>
        & { values: Array<Pick<StorefrontTypes.FilterValue, 'id' | 'label' | 'count' | 'input'>> }
      )> } }
  )> };

export type GetProductQueryQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type GetProductQueryQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'handle' | 'availableForSale' | 'title' | 'description' | 'descriptionHtml' | 'tags' | 'updatedAt' | 'vendor'>
    & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, compareAtPriceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, variants: { edges: Array<{ node: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>
          & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
        ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'>, collections: { nodes: Array<(
        Pick<StorefrontTypes.Collection, 'title'>
        & { products: { edges: Array<{ node: Pick<StorefrontTypes.Product, 'title' | 'vendor'> }> } }
      )> } }
  )> };

export type GetProductsQueryQueryVariables = StorefrontTypes.Exact<{
  sortKey?: StorefrontTypes.InputMaybe<StorefrontTypes.ProductSortKeys>;
  reverse?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Boolean']['input']>;
  query?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
  cursor?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type GetProductsQueryQuery = { products: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'handle' | 'availableForSale' | 'title' | 'description' | 'descriptionHtml' | 'tags' | 'updatedAt' | 'vendor'>
        & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, compareAtPriceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, variants: { edges: Array<{ node: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>
              & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
            ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'>, collections: { nodes: Array<(
            Pick<StorefrontTypes.Collection, 'title'>
            & { products: { edges: Array<{ node: Pick<StorefrontTypes.Product, 'title' | 'vendor'> }> } }
          )> } }
      ) }> } };

export type GetProductRecommendationsQueryQueryVariables = StorefrontTypes.Exact<{
  productId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetProductRecommendationsQueryQuery = { productRecommendations?: StorefrontTypes.Maybe<Array<(
    Pick<StorefrontTypes.Product, 'id' | 'handle' | 'availableForSale' | 'title' | 'description' | 'descriptionHtml' | 'tags' | 'updatedAt' | 'vendor'>
    & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, compareAtPriceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, variants: { edges: Array<{ node: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>
          & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
        ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'>, collections: { nodes: Array<(
        Pick<StorefrontTypes.Collection, 'title'>
        & { products: { edges: Array<{ node: Pick<StorefrontTypes.Product, 'title' | 'vendor'> }> } }
      )> } }
  )>> };

export type CollectionProductsQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
  first: StorefrontTypes.Scalars['Int']['input'];
  after?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
  filters?: StorefrontTypes.InputMaybe<Array<StorefrontTypes.ProductFilter> | StorefrontTypes.ProductFilter>;
  sortKey?: StorefrontTypes.InputMaybe<StorefrontTypes.ProductCollectionSortKeys>;
  reverse?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Boolean']['input']>;
}>;


export type CollectionProductsQuery = { collection?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Collection, 'handle' | 'title'>
    & { products: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, edges: Array<(
        Pick<StorefrontTypes.ProductEdge, 'cursor'>
        & { node: (
          Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'availableForSale'>
          & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
        ) }
      )> } }
  )> };

export type ShopQueryQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type ShopQueryQuery = { shop: (
    Pick<StorefrontTypes.Shop, 'name'>
    & { primaryDomain: Pick<StorefrontTypes.Domain, 'url'> }
  ) };

interface GeneratedQueryTypes {
  "\n#graphql\n query GetStoreBranding {\n    shop {\n      name\n      brand {\n        slogan\n        shortDescription\n        colors {\n          primary {\n            background\n            foreground\n          }\n          secondary {\n            background\n            foreground\n          }\n        }\n        logo {\n          image {\n            url\n            altText\n          }\n        }\n        squareLogo {\n          image {\n            url\n            altText\n          }\n        }\n        coverImage {\n          image {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n": {return: GetStoreBrandingQuery, variables: GetStoreBrandingQueryVariables},
  "\n#graphql\nquery ListCollections(\n  $first: Int\n  $last: Int\n  $after: String\n  $before: String\n  $query: String\n  $sortKey: CollectionSortKeys\n  $reverse: Boolean\n) {\n  collections(\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n    query: $query\n    sortKey: $sortKey\n    reverse: $reverse\n  ) {\n    edges {\n      cursor\n      node {\n        id\n        handle\n        title\n        description\n        image {\n          url\n          altText\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    totalCount\n  }\n}\n": {return: ListCollectionsQuery, variables: ListCollectionsQueryVariables},
  "\n  #graphql\n  query CollectionFacets($handle: String!) {\n    collection(handle: $handle) {\n    id\n    handle\n      products(first: 1) {\n        filters {\n          id\n          label\n          type\n          values {\n            id\n            label\n            count\n            input\n          }\n        }\n      }\n    }\n  }\n": {return: CollectionFacetsQuery, variables: CollectionFacetsQueryVariables},
  "\n#graphql\n  query GetProductQuery($handle: String!) {\n    product(handle: $handle) {\n      ...product\n    }\n  }\n  \n#graphql\n   fragment product on Product {\n    id\n    handle\n    availableForSale\n    title\n    description\n    descriptionHtml\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...image\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...image\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    vendor\n    collections(first: 100) {\n      nodes {\n        title\n        products(first: 100) {\n          edges {\n            node {\n              title\n              vendor\n            }\n          }\n        }\n      }\n    }\n  }\n    \n#graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    \n#graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: GetProductQueryQuery, variables: GetProductQueryQueryVariables},
  "\n#graphql\nquery getProductsQuery($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $cursor: String) {\n    products(sortKey: $sortKey, reverse: $reverse, query: $query, after: $cursor) {\n        pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n        }\n        edges {\n            node {\n                ...product\n            }\n        }\n    }\n}\n    \n#graphql\n   fragment product on Product {\n    id\n    handle\n    availableForSale\n    title\n    description\n    descriptionHtml\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...image\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...image\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    vendor\n    collections(first: 100) {\n      nodes {\n        title\n        products(first: 100) {\n          edges {\n            node {\n              title\n              vendor\n            }\n          }\n        }\n      }\n    }\n  }\n    \n#graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    \n#graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: GetProductsQueryQuery, variables: GetProductsQueryQueryVariables},
  "\n#graphql\nquery getProductRecommendationsQuery($productId: ID!) {\n    productRecommendations(productId: $productId) {\n        ...product\n    }\n}\n    \n#graphql\n   fragment product on Product {\n    id\n    handle\n    availableForSale\n    title\n    description\n    descriptionHtml\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...image\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...image\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    vendor\n    collections(first: 100) {\n      nodes {\n        title\n        products(first: 100) {\n          edges {\n            node {\n              title\n              vendor\n            }\n          }\n        }\n      }\n    }\n  }\n    \n#graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    \n#graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: GetProductRecommendationsQueryQuery, variables: GetProductRecommendationsQueryQueryVariables},
  "#graphql\nquery CollectionProducts(\n  $handle: String!\n  $first: Int!\n  $after: String\n  $filters: [ProductFilter!]\n  $sortKey: ProductCollectionSortKeys\n  $reverse: Boolean\n) {\n  collection(handle: $handle) {\n    handle\n    title\n    products(\n      first: $first\n      after: $after\n      filters: $filters\n      sortKey: $sortKey\n      reverse: $reverse\n    ) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      edges {\n        cursor\n        node {\n          id\n          handle\n          title\n          availableForSale\n          featuredImage {\n            url\n            altText\n            width\n            height\n          }\n          priceRange {\n            minVariantPrice { amount currencyCode }\n            maxVariantPrice { amount currencyCode }\n          }\n        }\n      }\n    }\n  }\n}\n": {return: CollectionProductsQuery, variables: CollectionProductsQueryVariables},
  "#graphql\n  query ShopQuery {\n    shop {\n      name\n      primaryDomain {\n        url\n      }\n    }\n  }\n": {return: ShopQueryQuery, variables: ShopQueryQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
