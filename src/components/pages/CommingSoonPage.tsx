import React from "react";
import ReactPlayer from "react-player";
import PageFrame from "../atoms/PageFrame";
import { styled } from "styled-components";
import CommingSoonMP4 from "@/assets/videos/commingsoon.mp4";

const CommingSoonFrame = styled(PageFrame)`
  background-color: black;
`;
const PlayerFrame = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
`;

const CommingSoonPage = () => {
  return (
    <CommingSoonFrame>
      <PlayerFrame>
        <ReactPlayer
          url={CommingSoonMP4}
          width="100%"
          height="100%"
          muted
          loop
          playing
          playsinline
          config={{
            file: {
              attributes: {
                disablePictureInPicture: true,
                onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
              },
            },
          }}
        />
      </PlayerFrame>
    </CommingSoonFrame>
  );
};

export default CommingSoonPage;
