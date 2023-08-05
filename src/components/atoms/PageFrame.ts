import { hScalePx } from "@/hooks/useHorizontalRatio";
import SimpleBar from "simplebar-react";
import styled from "styled-components";

const PageFrame = styled(SimpleBar)`
  width: ${hScalePx(360)};
  height: 100%;
  flex-shrink: 0;
  margin: 0 auto;
  background-color: white;
  .simplebar-content {
    height: 100%;
  }
  padding: 0 0 0 env(safe-area-inset-bottom, 0);
`;

export default PageFrame;
