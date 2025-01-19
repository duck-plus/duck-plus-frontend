import type {
  GetMainCafeBannerQuery,
  GetMainCafeBannerQueryVariables,
} from '../../gql-outputs/graphql';
import { IMockQueryOptions, mockMainCafeBannerData } from './mock';

export function useMockGetMainCafeBannerQuery(
  variables: GetMainCafeBannerQueryVariables,
  options?: IMockQueryOptions
): { data: GetMainCafeBannerQuery | null } {
  if (options?.enabled === false) {
    return { data: null };
  }

  return { data: mockMainCafeBannerData };
}
