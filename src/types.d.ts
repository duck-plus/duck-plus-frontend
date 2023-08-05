declare module "*.css" {} // for import autocompletion
declare module "*.mp4" {
  const src: string;
  export default src;
} // for import autocompletion
