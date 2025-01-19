import { useMemo } from 'react';

import isNonNullable from '@/utils/isNonNullable';

import { useMockGetCafeListQuery } from '../services/gql/gql-outputs-mock/useMockGetCafeList';

// 필터 내용에 해당하는 cafe만 모아 반환
export default function useFilteredCafeList(filter: {
  feature?: string;
  region?: string;
  dailyCharge?: number;
}) {
  const { feature, region, dailyCharge } = filter;
  const { data: cafeListQuery } = useMockGetCafeListQuery({});

  return useMemo(() => {
    return {
      data: (cafeListQuery?.cafeList || [])
        .filter(isNonNullable)
        .filter(cafe => !feature || cafe.featureList.some(feat => !feat || feature === feat))
        .filter(cafe => !region || cafe.region === region)
        .filter(
          cafe => dailyCharge === undefined || cafe.feeInfo.dailyCharge <= Number(dailyCharge)
        ),
    };
  }, [cafeListQuery?.cafeList, dailyCharge, feature, region]);
}
