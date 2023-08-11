import type { CodegenConfig } from "@graphql-codegen/cli";

export const GQL_ENDPOINT = "/graphql";

const codegenConfig: CodegenConfig = {
  overwrite: true,
  config: {
    namingConvention: "keep",
    scalars: {},
    enumsAsTypes: true,
  },
  generates: {
    "src/services/gql-outputs/": {
      preset: "client",
      plugins: [
        { "typescript-enum-array": { constArrays: true } },
        {
          "typescript-react-query": {
            documentVariableSuffix: "QueryString",
            addInfiniteQuery: true,
            fetcher: {
              func: "@/services/gqlFetcher#useFetchData",
              isReactHook: true,
            },
            exposeQueryKeys: true,
          },
        },
      ],
    },
  },
  schema: `${process.env.REACT_APP_API_URL ?? "undefined"}${GQL_ENDPOINT}`,
  documents: ["src/services/gql/**/*.gql"],
};

export default codegenConfig;
