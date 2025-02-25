import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; //
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserSlice";

// -----------------------------------------------------------1st part in frontened----------------------------------------------}
//here i am checking the backend is accepting my request or not
//const user = { email: "leahkj@gmail.com", password: "sub14895" };

const Login = () => {
  //-------------------------------------------------------------2nd part infrontend---------------------------------------------}
  // useEffect(() => {//without useeffect the component will render along with it tryb to fetch the data so it decrese the performance to avoid it we useuseeffect as it runs after render
  //   (async () => {
  //     const res = await fetch("http://localhost:4000/login", {
  //       method: "POST",
  //       credentials: "include", //cookie will go with req
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(user),
  //     });
  //     // console.log(res);
  //     const data = await res.text();
  //     console.log(data);
  //   })();
  // });
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function SubmitHandler() {
    setLoader(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        credentials: "include", //cookie will go with req
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      const data = await res.json();
      if (data.user) {
        dispatch(setUser(data.user));
        navigate("/");
      }
      toast(data.message);
    } catch (error) {
      toast(error.message);
    }
    setLoader(false);
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-96">
            <h2 className="text-3xl font-bold text-center mb-6">🔐 Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded mb-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={Email}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded mb-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={Password}
            />
            <button
              className="w-full bg-yellow-400 text-gray-900 p-3 rounded font-bold hover:bg-yellow-500 transition"
              onClick={SubmitHandler}
            >
              Login
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow-300 underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
