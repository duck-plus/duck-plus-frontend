import "styled-components";
import { ColorsTypes, FontFacesTypes } from "@/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontFaces: FontFacesTypes;
  }

  export function useTheme(): DefaultTheme;
}
