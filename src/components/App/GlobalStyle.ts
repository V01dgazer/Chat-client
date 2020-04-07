import { createGlobalStyle } from "styled-components";
import background from "../../assets/img/background.svg";

export const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    background-image: url(${background}) ;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .blurring.dimmed.dimmable > :not(.dimmer).popup {
    filter: none;
  }
`;
