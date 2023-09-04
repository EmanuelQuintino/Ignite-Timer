import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { Button } from "./components/Button";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>App</h1>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="neutral" />
      <Button />

      <GlobalStyle />
    </ThemeProvider>
  );
}
