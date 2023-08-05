import React from "react";
import { styled } from "styled-components";
import useBottomSheet from "@/hooks/useBottomSheet";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import AppTopBarLogoLeft from "../organisms/AppTopBarLogoLeft";
import SimpleBar from "simplebar-react";

const HomePageFrame = styled(SimpleBar)`
  width: ${hScalePx(360)};
  height: 100%;
  flex-shrink: 0;
  margin: 0 auto;
  background-color: white;
`;

const BottomSheetContent = styled.div`
  margin: ${hScalePx(20)};
`;

const HomePage = () => {
  const { BottomSheet, register } = useBottomSheet(true);
  return (
    <HomePageFrame>
      <AppTopBarLogoLeft />
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed
      et. Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos.Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos.Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos.Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, sed et.
      Perspiciatis alias dicta, laboriosam cumque nihil dolore laborum omnis
      adipisci eum doloribus? Ut optio atque, fugiat saepe suscipit eos.
      <BottomSheet {...register}>
        <BottomSheetContent>Hi, I'm BottomSheet.</BottomSheetContent>
      </BottomSheet>
    </HomePageFrame>
  );
};

export default HomePage;
