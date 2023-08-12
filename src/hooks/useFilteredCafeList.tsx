import { useGetCafeListQuery } from "@/services/gql-outputs/graphql";
import isNotNull from "@/utils/isNotNull";

// feature, region에 해당하는 cafe만 모아 반환
export default function useFilteredCafeList(
  feature: string | undefined,
  region: string
) {
  return useGetCafeListQuery(
    {},
    {
      select: ({ cafeList }) =>
        (cafeList || [])
          .filter(isNotNull)
          .filter(
            (cafe) =>
              !feature ||
              cafe.featureList.some((feat) => !feat || feature === feat)
          )
          .filter((cafe) => cafe.region === region),
    }
  );
}
