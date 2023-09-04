import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/defaultTheme";
import { Button } from "./components/Button";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>App</h1>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="neutral" />
      <Button />
    </ThemeProvider>
  );
}
