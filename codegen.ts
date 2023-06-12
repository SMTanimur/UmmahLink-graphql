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
        // 'typescript-graphql-request',
      ],
      config: {
        // fetcher: 'graphql-request',
        fetcher: {
          func: '../configs#fetcher',
          // func: 'ui#customFetcher',

          fetchParams: {
            credentials: 'include',
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
      hooks: {
        afterOneFileWrite: ['prettier --write'],
      },
    },
  },
};

export default config;
