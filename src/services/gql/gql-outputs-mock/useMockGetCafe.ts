import type { GetCafeQuery, GetCafeQueryVariables } from '../../gql-outputs/graphql';
import { IMockQueryOptions, mockCafeDataList } from './mock';

export function useMockGetCafeQuery(
  variables: GetCafeQueryVariables,
  options?: IMockQueryOptions
): { data: GetCafeQuery | null } {
  if (options?.enabled === false) {
    return { data: null };
  }

  const { code } = variables;

  const cafe = mockCafeDataList.find(data => data.cafe?.code === code);

  if (!cafe) {
    throw new Error('Cafe not found');
  }

  return { data: cafe };
}
