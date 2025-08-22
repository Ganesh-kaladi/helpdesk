import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Applayout from "./Applayout";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import AllTickets from "./pages/AllTickets";
import CreateTicket from "./pages/CreateTicket";
import { useDispatch, useSelector } from "react-redux";
import SingleTicket from "./pages/SingleTicket";
import TriageTicket from "./pages/TriageTicket";
import AgentSuggestion from "./pages/AgentSuggestion";
import AgentReview from "./pages/AgentReview";
import UpdateConfig from "./pages/UpdateConfig";
import KBList from "./pages/KBList";
import KBEditor from "./pages/KBEditor";
import { useEffect } from "react";
import { getMe } from "./slice/authSlice";
import KBupdate from "./components/KBupdate";
import CheckJWT from "./middleware/CheckJWT";
import JWTexpiry from "./middleware/JWTexpiry";
import ProtectedRoute from "./middleware/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (token) {
      if (!user) {
        dispatch(getMe(token));
      }
    }
  }, [token, dispatch, user]);

  return (
    <>
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          className: "",
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: "#dcfeff",
            color: "#1a112e",
          },
        }}
      />
      <Routes>
        {/* <Route path="/" element={<Applayout />} /> */}
        {role === "user" && (
          <Route
            path="/"
            element={
              <JWTexpiry>
                <ProtectedRoute>
                  <Applayout />
                </ProtectedRoute>
              </JWTexpiry>
            }
          >
            <Route
              index
              element={<Navigate to={"user/all-tickets"} replace />}
            />
            <Route path="user/all-tickets" element={<AllTickets />} />
            <Route path="user/all-tickets/:id" element={<SingleTicket />} />
            <Route path="user/create-ticket" element={<CreateTicket />} />
          </Route>
        )}

        {role === "agent" && (
          <Route
            path="/"
            element={
              <JWTexpiry>
                <ProtectedRoute>
                  <Applayout />
                </ProtectedRoute>
              </JWTexpiry>
            }
          >
            <Route
              index
              element={<Navigate to={"agent/suggestions/:ticketID"} replace />}
            />
            <Route
              path="agent/suggestions/:ticketID"
              element={<AgentSuggestion />}
            />
            <Route path="agent/triage" element={<TriageTicket />} />
            <Route path="agent/review" element={<AgentReview />} />
          </Route>
        )}

        {role === "admin" && (
          <Route
            path="/"
            element={
              <JWTexpiry>
                <ProtectedRoute>
                  <Applayout />
                </ProtectedRoute>
              </JWTexpiry>
            }
          >
            <Route index element={<Navigate to={"admin/config"} replace />} />
            <Route path="admin/config" element={<UpdateConfig />} />
            <Route path="admin/all-kb" element={<KBList />} />
            <Route path="admin/add-new-kb" element={<KBEditor />} />
            <Route path="admin/all-kb/:id" element={<KBupdate />} />
          </Route>
        )}

        <Route
          path="/login"
          element={
            <CheckJWT>
              <Login />
            </CheckJWT>
          }
        />
        <Route
          path="/sign-up"
          element={
            <CheckJWT>
              <Signup />
            </CheckJWT>
          }
        />
      </Routes>
    </>
  );
}

export default App;
