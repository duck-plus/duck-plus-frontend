import { useGetCafeListQuery } from "@/services/gql-outputs/graphql";
import isNonNullable from "@/utils/isNonNullable";

/** 카페들의 featureList만 모아 반환 */
export default function useCafeFeatureList() {
  return useGetCafeListQuery(
    {},
    {
      select: ({ cafeList }): (string | undefined)[] => [
        undefined, // <= 전체보기
        ...(cafeList || [])
          .filter(isNonNullable)
          .flatMap(({ featureList }) => featureList.filter(isNonNullable))
          // 중복 제거
          .filter((a, idx, arr) => arr.findIndex((b) => b === a) === idx),
      ],
    }
  );
}
