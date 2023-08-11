import { useGetCafeListQuery } from "@/services/gql-outputs/graphql";
import isNotNull from "@/utils/isNotNull";

/** 카페들의 featureList만 모아 반환 */
export default function useCafeFeatureList() {
  return useGetCafeListQuery(
    {},
    {
      select: ({ cafeList }): (string | undefined)[] => [
        undefined, // <= 전체보기
        ...(cafeList || [])
          .filter(isNotNull)
          .flatMap(({ featureList }) => featureList.filter(isNotNull))
          // 중복 제거
          .filter((a, idx, arr) => arr.findIndex((b) => b === a) === idx),
      ],
    }
  );
}
