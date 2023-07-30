import { css, DefaultTheme } from "styled-components";
import { hScalePx } from "@/hooks/useHorizontalRatio";

const colors = {
  black: "#000000",
  white: "#ffffff",
  // GRAY
  gray50: "#fbfbfb",
  gray100: "#f4f4f4",
  gray200: "#e0e0e0",
  gray300: "#d6d6d6",
  gray400: "#b3b3b3",
  gray500: "#a8a8a8",
  gray600: "#8d8d8d",
  gray700: "#6f6f6f",
  gray800: "#525252",
  gray900: "#262626",
  // GREEN
  green50: "#e6f7f0",
  green100: "#b0e7cf",
  green200: "#8adcb8",
  green300: "#54cb97",
  green400: "#33c183",
  green500: "#00b264",
  green600: "#00a25b",
  green700: "#007e47",
  green800: "#006237",
  green900: "#004b2a",
  // RED
  red50: "#feecec",
  red100: "#fac3c5",
  red200: "#f8a7a9",
  red300: "#f57e82",
  red400: "#f3656a",
  red500: "#f03f45",
  red600: "#da393f",
  red700: "#aa2d31",
  red800: "#842326",
  red900: "#651a1d",
  // ORANGE
  orange50: "#ffeee6",
  orange100: "#ffcbb0",
  orange200: "#ffb28a",
  orange300: "#ff8e54",
  orange400: "#ff7933",
  orange500: "#ff5700",
  orange600: "#e84f00",
  orange700: "#b53e00",
  orange800: "#8c3000",
  orange900: "#6b2500",
  // YELLOW
  yellow50: "#fffdef",
  yellow100: "#fff9ce",
  yellow200: "#fff6b6",
  yellow300: "#fff294",
  yellow400: "#ffef80",
  yellow500: "#ffeb60",
  yellow600: "#e8d657",
  yellow700: "#b5a744",
  yellow800: "#8c8135",
  yellow900: "#6b6328",
  // BLUE
  blue50: "#eaefff",
  blue100: "#bfcdff",
  blue200: "#a0b5ff",
  blue300: "#7493ff",
  blue400: "#597eff",
  blue500: "#305eff",
  blue600: "#2c56e8",
  blue700: "#2243b5",
  blue800: "#1a348c",
  blue900: "#14276b",
} as const;

const fontFaces = {
  "Headline1/24-Bold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(24)};
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(32)};
  `,
  "Headline1/24-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(24)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(32)};
  `,
  "Headline1/24-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(24)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(32)};
  `,
  "Headline1/24-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(24)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(32)};
  `,

  "Headline2/20-Bold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(20)};
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(28)};
  `,
  "Headline2/20-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(20)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(28)};
  `,
  "Headline2/20-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(20)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(28)};
  `,
  "Headline2/20-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(20)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(28)};
  `,

  "title1/18-Bold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(18)};
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(24)};
  `,
  "title1/18-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(18)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(24)};
  `,
  "title1/18-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(18)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(24)};
  `,
  "title1/18-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(18)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(24)};
  `,

  "title2/16-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(16)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(22)};
  `,
  "title2/16-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(16)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(22)};
  `,
  "title2/16-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(16)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(22)};
  `,

  "body1/14-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(14)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(20)};
  `,
  "body1/14-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(14)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(20)};
  `,
  "body1/14-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(14)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(20)};
  `,

  "body2/12-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(12)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(20)};
  `,
  "body2/12-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(12)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(20)};
  `,
  "body2/12-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(12)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(20)};
  `,

  "caption/10-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(10)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(14)};
  `,
  "caption/10-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(10)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(14)};
  `,
  "caption/10-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(10)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(14)};
  `,

  "outline/9-SemiBold": css`
    font-family: "SUIT";
    font-size: ${hScalePx(9)};
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(12)};
  `,
  "outline/9-Medium": css`
    font-family: "SUIT";
    font-size: ${hScalePx(9)};
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(12)};
  `,
  "outline/9-Regular": css`
    font-family: "SUIT";
    font-size: ${hScalePx(9)};
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: ${hScalePx(12)};
  `,
} as const;

export type ColorsTypes = typeof colors;
export type FontFacesTypes = typeof fontFaces;

export const theme: DefaultTheme = {
  colors,
  fontFaces,
};
