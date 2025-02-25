import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/UserSlice";
import Authorisation from "./Authorisation/Authorisation";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/Userinformation`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
            credentials: "include",
          }
        );
        let data = await res.text();
        if (data == "user not found") {
          dispatch(setUser(null));
        } else {
          dispatch(setUser(JSON.parse(data)));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="mt-16 w-full h-full text-center text-9xl">Home</h1>
            }
          />

          <Route
            path="/login"
            element={
              <Authorisation>
                <Login />
              </Authorisation>
            }
          />

          <Route
            path="/register"
            element={
              <Authorisation>
                <Register />
              </Authorisation>
            }
          />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
