import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./routes";
import { TaskContextProvider } from "./context/TaskContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TaskContextProvider>
        <Router />
      </TaskContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}
