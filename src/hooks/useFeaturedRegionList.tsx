import { useMemo } from 'react';

import isNonNullable from '@/utils/isNonNullable';

import { useMockGetCafeListQuery } from '../services/gql/gql-outputs-mock/useMockGetCafeList';

/** feature에 해당하는 카페들의 regionList만 모아 반환 */
export default function useFeaturedRegionList(selectedFeature: string | undefined) {
  const { data: cafeListQuery } = useMockGetCafeListQuery({});

  return useMemo(() => {
    return {
      data: [
        undefined,
        ...(cafeListQuery?.cafeList || [])
          // NotNull, Feature에 해당하는 cafe만 남김
          .filter(isNonNullable)
          .filter(({ featureList }) => isNonNullable(featureList))
          // 전체보기면 모두 남김, 아니면 feature가 일치하는 것만 남김
          .filter(({ featureList }) =>
            featureList.some(f => !selectedFeature || f === selectedFeature)
          )
          // region 종합
          .map(({ region }) => region)
          // 중복 제거
          .filter((a, idx, arr) => arr.findIndex(b => b === a) === idx),
      ],
    };
  }, [cafeListQuery?.cafeList, selectedFeature]);
}
