import React from "react";
import { styled } from "styled-components";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import CafeList from "./CafeList";
import TabBar from "./TabBar";
import AppTopBar from "./AppTopBar";

const CategoryTabList = styled(TabBar.TabList)`
  position: sticky;
  top: ${AppTopBar.CSSAppTopBarHeight};
  z-index: 100;
`;

const RegionTabList = styled(TabBar.TabList)`
  position: sticky;
  top: calc(${AppTopBar.CSSAppTopBarHeight} + ${TabBar.CSSTabBarHeight});
  z-index: 100;
`;
const RegionTab = styled(TabBar.Tab)`
  &.selected {
    border-bottom: ${hScalePx(2)} solid white;
  }
`;

export const CategoryList = [
  "전체보기",
  "무료대관",
  "특전맛집",
  "대형카페",
  "전체보기2",
  "무료대관2",
  "특전맛집2",
  "대형카페2",
  "전체보기3",
  "무료대관3",
  "특전맛집3",
  "대형카페3",
] as const;

const RegionList = ["홍대/합정", "캐나다", "일본", "태초마을"] as const;

const CafeListTabBar = () => {
  return (
    <TabBar.Tabs>
      {/* 카테고리 필터 */}
      <CategoryTabList>
        {CategoryList.map((category) => (
          <TabBar.Tab key={category}>{category}</TabBar.Tab>
        ))}
      </CategoryTabList>

      {CategoryList.map((category) => (
        <TabBar.TabPanel key={category}>
          {/* 지역 필터*/}
          <TabBar.Tabs>
            <RegionTabList>
              {RegionList.map((region) => (
                <RegionTab key={region}>{region}</RegionTab>
              ))}
            </RegionTabList>
            {RegionList.map((region) => (
              <TabBar.TabPanel key={region}>
                {/* 카페 목록 */}
                <CafeList category={category} region={region} />
              </TabBar.TabPanel>
            ))}
          </TabBar.Tabs>
        </TabBar.TabPanel>
      ))}
    </TabBar.Tabs>
  );
};

export default CafeListTabBar;
