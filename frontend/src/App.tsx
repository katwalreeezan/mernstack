import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { Suspense, lazy } from "react";

// Lazy load your components
const AllStudent = lazy(() => import("./pages/Student/AllStudent"));
const StudentForm = lazy(() => import("./pages/Student/StudentForm"));

// Fallback loading component
const Loading = () => {
  return <div>Loading...</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate replace to="/student" />} />

        {/* Lazy-loaded AllStudent */}
        <Route
          path="/student"
          element={
            <Suspense fallback={<Loading />}>
              <AllStudent />
            </Suspense>
          }
        />

        {/* Lazy-loaded StudentForm */}
        <Route
          path="/add"
          element={
            <Suspense fallback={<Loading />}>
              <StudentForm />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
