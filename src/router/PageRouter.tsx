import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { DashBoardPage } from "../pages/DashBoardPage";

export const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path="/home" element={<DashBoardPage />} />
        </>
      </Routes>
    </BrowserRouter>
  );
};
