import { GQL_ENDPOINT } from "./gqlCodegenConfig";
import customAxios from "./CustomAxios";

/** gql codegen에서 사용할 fetcher */
export const useFetchData = <TData, TVariables>(
  query: string,
  options?: RequestInit["headers"]
): ((variables?: TVariables) => Promise<TData>) => {
  return async (variables?: TVariables) => {
    const response = await customAxios.post<{ data: TData }>(GQL_ENDPOINT, {
      headers: {
        ...options,
      },
      query,
      variables: {
        ...variables,
      },
    });
    return response.data.data;
  };
};
