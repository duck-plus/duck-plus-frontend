import type { GetCafeListQuery, GetCafeListQueryVariables } from '../../gql-outputs/graphql';
import { IMockQueryOptions, mockCafeListData } from './mock';

export function useMockGetCafeListQuery(
  _?: GetCafeListQueryVariables,
  options?: IMockQueryOptions
): { data: GetCafeListQuery | null } {
  if (options?.enabled === false) {
    return { data: null };
  }

  return {
    data: mockCafeListData,
  };
}
