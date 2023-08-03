import { hScalePx } from "@/hooks/useHorizontalRatio";
import { styled } from "styled-components";

const HSeperator = styled.div`
  border-bottom: solid ${hScalePx(1)} ${({ theme }) => theme.colors.gray100};
  height: 0;
`;

export default HSeperator;
