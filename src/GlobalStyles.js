import { createGlobalStyle } from 'styled-components';
import BackgroundImage from './assets/Background.jpg'; // Adjust the path to your background image

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-image: url(${BackgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }
`;

export default GlobalStyles;
