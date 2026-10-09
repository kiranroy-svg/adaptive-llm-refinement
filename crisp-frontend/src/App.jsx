import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Assistant from "./pages/Assistant"
import InitialResponse from "./pages/InitialResponse"
import Evaluation from "./pages/Evaluation"
import Decision from "./pages/Decision"
import Critique from "./pages/Critique"
import Refinement from "./pages/Refinement"
import Comparison from "./pages/Comparison"
import FinalResponse from "./pages/FinalResponse"
import Analytics from "./pages/Analytics"
import Experiments from "./pages/Experiments"
import Settings from "./pages/Settings"
import HowItWorks from "./pages/HowItWorks"

import MainLayout from "./layouts/MainLayout"


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public pages */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* CRISP application flow */}

        <Route
          path="/assistant"
          element={
            <MainLayout>
              <Assistant />
            </MainLayout>
          }
        />

        <Route
          path="/initial-response"
          element={
            <MainLayout>
              <InitialResponse />
            </MainLayout>
          }
        />

        <Route
          path="/evaluation"
          element={
            <MainLayout>
              <Evaluation />
            </MainLayout>
          }
        />

        <Route
          path="/decision"
          element={
            <MainLayout>
              <Decision />
            </MainLayout>
          }
        />

        <Route
          path="/critique"
          element={
            <MainLayout>
              <Critique />
            </MainLayout>
          }
        />

        <Route
          path="/refinement"
          element={
            <MainLayout>
              <Refinement />
            </MainLayout>
          }
        />

        <Route
          path="/comparison"
          element={
            <MainLayout>
              <Comparison />
            </MainLayout>
          }
        />

        <Route
          path="/final-response"
          element={
            <MainLayout>
              <FinalResponse />
            </MainLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <MainLayout>
              <Analytics />
            </MainLayout>
          }
        />

        <Route
          path="/experiments"
          element={
            <MainLayout>
              <Experiments />
            </MainLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />

        <Route
          path="/how-it-works"
          element={
            <MainLayout>
              <HowItWorks />
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App