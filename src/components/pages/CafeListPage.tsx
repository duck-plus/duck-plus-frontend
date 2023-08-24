import React, { useState } from 'react';
import PageFrame from '@/components/atoms/PageFrame';
import AppTopBar from '../organisms/AppTopBar';
import useCafeFeatureList from '@/hooks/useCafeFeatureList';
import useFeaturedRegionList from '@/hooks/useFeaturedRegionList';
import { hScalePx } from '@/hooks/useHorizontalRatio';
import styled from 'styled-components';
import CafeList from '../organisms/CafeList';
import TabBar from '../organisms/TabBar';
import { useTypedSearchParams } from 'react-router-typesafe-routes/dom';
import { ROUTES } from '@/router';

const CategoryTabList = styled(TabBar.TabList)`
  position: sticky;
  top: ${AppTopBar.CSSAppTopBarHeight};
  z-index: 1000;
`;

const RegionTabList = styled(TabBar.TabList)`
  height: ${hScalePx(56)};
  position: sticky;
  top: calc(${AppTopBar.CSSAppTopBarHeight} + ${TabBar.CSSTabBarHeight});
  padding: ${hScalePx(12)} ${hScalePx(14)};
  z-index: 1000;

  .simplebar-content {
    gap: ${hScalePx(6)};
  }
`;

const RegionTab = styled(TabBar.Tab)`
  height: ${hScalePx(28)};
  ${({ theme }) => theme.fontFaces['body2/12-Regular']};
  padding: ${hScalePx(3)} ${hScalePx(12)};
  border-radius: ${hScalePx(100)};
  color: ${({ theme }) => theme.colors.black};
  border: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray100};

  &.selected {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    border-bottom: ${hScalePx(2)} solid white;
    padding: ${hScalePx(5)} ${hScalePx(13)};
    border: ${hScalePx(0)};
  }
`;

const CafeListPage = () => {
  // 특성 목록
  const { data: featureList } = useCafeFeatureList();

  // 선택된 특성
  const [searchParams] = useTypedSearchParams(ROUTES.CAFE.LIST);
  const [selectedFeatureIdx, setSelectedFeatureIdx] = useState<number>(
    featureList?.indexOf(searchParams.initFeat) || 0
  );
  const selectedFeature = featureList?.at(selectedFeatureIdx);

  // 특성에 속한 지역 목록
  const { data: regionList } = useFeaturedRegionList(
    selectedFeature === '전체보기' ? undefined : selectedFeature
  );

  return (
    <PageFrame>
      <AppTopBar.LeftIcon />

      <TabBar.Tabs onSelect={idx => setSelectedFeatureIdx(idx)} selectedIndex={selectedFeatureIdx}>
        {/* 특성 필터 */}
        <CategoryTabList>
          {featureList?.map(feature => (
            <TabBar.Tab key={feature || ''}>{feature || '전체보기'}</TabBar.Tab>
          ))}
        </CategoryTabList>

        {featureList?.map(feature => (
          <TabBar.TabPanel key={feature || ''}>
            <TabBar.Tabs>
              {/* 지역 필터*/}
              <RegionTabList>
                {regionList?.map(region => (
                  <RegionTab key={region || ''}>{region || '전국'}</RegionTab>
                ))}
              </RegionTabList>
              {regionList?.map(region => (
                <TabBar.TabPanel key={region}>
                  {/* 카페 목록 */}
                  <CafeList
                    filter={{
                      feature,
                      region,
                    }}
                  />
                </TabBar.TabPanel>
              ))}
            </TabBar.Tabs>
          </TabBar.TabPanel>
        ))}
      </TabBar.Tabs>
    </PageFrame>
  );
};

export default CafeListPage;
