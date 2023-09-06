import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts/Default";
import { Home } from "../pages/Home";
import { History } from "../pages/History";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
