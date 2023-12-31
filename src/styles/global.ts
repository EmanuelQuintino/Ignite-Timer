import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  :focus {
    outline: 0; 
    box-shadow: 0 0 0 2px ${({ theme }) => theme["green-500"]};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background: ${({ theme }) => theme["gray-900"]};
    color: ${({ theme }) => theme["gray-300"]};
  }
  
  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
  }

  input {
    border: 0;
  }

  button {
    border: 0;
    border-radius: 8px;
  }

  button:hover {
    cursor: pointer;
  }

  .inputError {
    color: ${({ theme }) => theme["yellow-500"]};
    display: block;
    position: absolute;
    font-size: 1.2rem;
    margin-top: 1.6rem;
  }
`;
