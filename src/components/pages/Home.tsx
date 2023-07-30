import { hScalePx } from "@/hooks/useHorizontalRatio";
import React from "react";
import { styled } from "styled-components";

const HomePage = styled.div`
  background: ${({ theme }) => theme.colors.orange50};
  width: ${hScalePx(130)};
  height: 100%;
  flex-shrink: 0;
  margin: 0 auto;
`;

const Home = () => {
  return <HomePage>Hi, I'm Home.</HomePage>;
};

export default Home;
