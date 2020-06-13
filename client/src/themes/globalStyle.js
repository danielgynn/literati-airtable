import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.body.backgroundColor};
        font-family: ${(props) => props.theme.body.fontFamily};
    }
`;

export default GlobalStyle;
