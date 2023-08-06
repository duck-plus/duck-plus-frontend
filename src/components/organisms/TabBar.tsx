import React from "react";
import { styled } from "styled-components";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SimpleBar from "simplebar-react";
import { useScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

const CSSTabBarHeight = hScalePx(40);

const FilteredTabs = (
  props: Omit<
    React.ComponentProps<typeof Tabs>,
    "focusTabOnClick" | "selectedTabClassName"
  >
) => (
  <Tabs focusTabOnClick={false} selectedTabClassName="selected" {...props} />
);

const StyledTabList = styled(TabList)`
  padding: 0;
  margin: 0;
  display: flex;
  height: ${CSSTabBarHeight};
  background-color: white;
  overflow: visible;
`;

const HorizontalScroll = styled(SimpleBar)`
  width: 100%;
  .simplebar-content {
    gap: ${hScalePx(20)};
    display: flex;
    &::before &::after {
      flex-shrink: 0;
    }
  }
`;

/** https://web.archive.org/web/20160909091532/http://brunildo.org/test/scroll-child-margin.html */
const Extra = styled.div`
  height: auto;
  flex-shrink: 0;
  width: ${hScalePx(1)};
  margin: 0 ${hScalePx(-1)} 0 0;
  content: "";
`;

const WrappedTabList = ({
  children,
  ...leftOver
}: React.ComponentProps<typeof StyledTabList>) => {
  const { ref } = useScrollContainer();
  return (
    <StyledTabList {...leftOver}>
      <HorizontalScroll scrollableNodeProps={{ ref }}>
        {children}
        <Extra></Extra>
      </HorizontalScroll>
    </StyledTabList>
  );
};

Object.assign(WrappedTabList, { tabsRole: "TabList" });

const StyledTab = styled(Tab)`
  ${({ theme }) => theme.fontFaces["body2/12-Medium"]}
  color: ${({ theme }) => theme.colors.gray500};
  display: flex;
  height: 100%;
  padding: ${hScalePx(2)} 0 0 0;
  border-bottom: ${hScalePx(2)} solid transparent;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;

  &.selected {
    color: ${({ theme }) => theme.colors.gray900};
    border-bottom: ${hScalePx(2)} solid ${({ theme }) => theme.colors.gray900};
  }
`;

const TabBar = {
  Tabs: FilteredTabs,
  TabList: WrappedTabList,
  Tab: StyledTab,
  TabPanel,
  CSSTabBarHeight,
};

export default TabBar;
