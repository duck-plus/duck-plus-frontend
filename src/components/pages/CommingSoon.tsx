import React from "react";
import ReactPlayer from "react-player";
import PageFrame from "../atoms/PageFrame";
import { styled } from "styled-components";

const CommingSoonFrame = styled(PageFrame)`
  background-color: black;
`;
const PlayerFrame = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
`;

const CommingSoon = () => {
  return (
    <CommingSoonFrame>
      <PlayerFrame>
        <ReactPlayer
          url={"/commingsoon.mp4"}
          width="100%"
          height="100%"
          loop
          playing
          muted
        />
      </PlayerFrame>
    </CommingSoonFrame>
  );
};

export default CommingSoon;
