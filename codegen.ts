import { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
  schema: `apps/api/src/**/*.gql`,
  documents: 'libs/graphql/**/*.gql',
  generates: {
    'libs/graphql/src/graphql/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: {
          endpoint: 'http://localhost:8080/graphql',
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        },
        pureMagicComment: true,
        noHOC: true,
        noComponents: true,
        noNamespaces: true,
        withHooks: true,
        withSubscriptionHooks: true,
        exposeQueryKeys: true, // We use it as the key for the react query without having to manually give a string.
        exposeMutationKeys: true, // We use it as the key for the react query without having to manually give a string.
        exposeFetcher: true, // exposes a fetch to use for SSR,
      },
    },
  },
};

export default config;