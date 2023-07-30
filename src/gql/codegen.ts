import type { CodegenConfig } from "@graphql-codegen/cli";

export const GQL_ENDPOINT = "/<foo>/graphql";

const config: CodegenConfig = {
  overwrite: true,
  config: {
    namingConvention: "keep",
    scalars: {},
    enumsAsTypes: true,
  },
  generates: {
    "src/gql/output": {
      preset: "client",
      plugins: [
        { "typescript-enum-array": { constArrays: true } },
        {
          "typescript-react-query": {
            documentVariableSuffix: "QueryString",
            addInfiniteQuery: true,
            fetcher: {
              func: "./gqlFetcher#useFetchData",
              isReactHook: true,
            },
            exposeQueryKeys: true,
          },
        },
      ],
    },
  },
  schema: `${process.env.REACT_APP_API_URL ?? "undefined"}${GQL_ENDPOINT}`,
  documents: ["src/gql/input/**/*.{ts,gql}"],
};

export default config;
