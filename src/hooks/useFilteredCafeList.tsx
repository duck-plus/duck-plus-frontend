import { useGetCafeListQuery } from '@/services/gql-outputs/graphql';
import isNonNullable from '@/utils/isNonNullable';

// 필터 내용에 해당하는 cafe만 모아 반환
export default function useFilteredCafeList(filter: {
  feature?: string;
  region?: string;
  dailyCharge?: number;
}) {
  const { feature, region, dailyCharge } = filter;
  console.log(feature);
  return useGetCafeListQuery(
    {},
    {
      select: ({ cafeList }) =>
        (cafeList || [])
          .filter(isNonNullable)
          .filter(cafe => !feature || cafe.featureList.some(feat => !feat || feature === feat))
          .filter(cafe => !region || cafe.region === region)
          .filter(
            cafe => dailyCharge === undefined || cafe.feeInfo.dailyCharge <= Number(dailyCharge)
          ),
    }
  );
}
