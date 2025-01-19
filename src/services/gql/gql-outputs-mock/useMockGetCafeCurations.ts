import type {
  GetCafeCurationsQuery,
  GetCafeCurationsQueryVariables,
} from '../../gql-outputs/graphql';
import { IMockQueryOptions, mockCafeCurationsData, mockCafeDataList } from './mock';

export function useMockGetCafeCurations(
  variables?: GetCafeCurationsQueryVariables,
  options?: IMockQueryOptions
): { data: GetCafeCurationsQuery | null } {
  if (options?.enabled === false) {
    return { data: null };
  }

  const data: typeof mockCafeCurationsData = JSON.parse(JSON.stringify(mockCafeCurationsData));
  const cafeDetailList = mockCafeDataList.map(({ cafe }) => cafe);

  data.cafeList = data.cafeList?.filter(cafe => {
    const cafeDetail = cafeDetailList.find(cafeDetail => cafeDetail?.code === cafe?.code);

    if (variables?.args?.isPopular && !cafeDetail?.isPopular) {
      return false;
    }

    if (variables?.args?.feature && !cafeDetail?.featureList?.includes(variables.args.feature)) {
      return false;
    }

    if (variables?.args?.concept && cafeDetail?.concept !== variables.args.concept) {
      return false;
    }

    if (variables?.args?.isSpecialBenefitCustomable && !cafeDetail?.isSpecialBenefitCustomable) {
      return false;
    }

    return true;
  });

  return { data };
}
