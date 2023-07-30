import useHorizontalRatio, { hScalePx } from "@/hooks/useHorizontalRatio";
import React from "react";
import { styled } from "styled-components";

const HomePage = styled.div`
  background: pink;
  width: ${hScalePx(130)};
  height: 100%;
  flex-shrink: 0;
  margin: 0 auto;
`;

const Home = () => {
  const hr = useHorizontalRatio();
  return <HomePage>Hi, I'm Home. {hr}</HomePage>;
};

export default Home;
