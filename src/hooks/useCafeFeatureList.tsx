import { useMemo } from 'react';

import isNonNullable from '@/utils/isNonNullable';

import { useMockGetCafeListQuery } from '../services/gql/gql-outputs-mock/useMockGetCafeList';

/** 카페들의 featureList만 모아 반환 */
export default function useCafeFeatureList() {
  const { data: cafeListQuery } = useMockGetCafeListQuery({});

  return useMemo(() => {
    return {
      data: [
        undefined, // <= 전체보기
        ...(cafeListQuery?.cafeList || [])
          .filter(isNonNullable)
          .flatMap(({ featureList }) => featureList.filter(isNonNullable))
          // 중복 제거
          .filter((a, idx, arr) => arr.findIndex(b => b === a) === idx),
      ],
    };
  }, [cafeListQuery]);
}
