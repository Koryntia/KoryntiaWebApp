declare module "react-slick" {
  import * as React from "react";

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    afterChange?: (currentSlide: number) => void;
    // Agrega aquí cualquier otra propiedad que uses
  }

  // Se exporta como default un componente basado en React.Component
  export default class Slider extends React.Component<Settings> {}
}
