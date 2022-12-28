import "styled-components";

declare module "styled-components" {
  declare module "*.svg" {
    const content: any;
    export default content;
  }
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
    isDraggingOver: string;
    isDraggingFromThisWith: string;
    isDragging: string;
    textColor: string;
  }
}
