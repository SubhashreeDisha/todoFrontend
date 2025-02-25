import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

// const user = {
//   name: "Subas",
//   email: "leahkj@gmail.com",
//   password: "sub14895",
// };

const Register = () => {
  const [name, setname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  async function SubmitHandler() {
    setLoader(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "POST",
        credentials: "include", //cookie will go with req
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: Email,
          password: Password,
        }),
      });

      const data = await res.text();
      toast(data);
      setEmail("");
      setPassword("");
      setname("");
      navigate("/login");
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
            <h2 className="text-3xl font-bold text-center mb-6">📝 Register</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded mb-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
              onChange={(e) => {
                setname(e.target.value);
              }}
              value={name}
            />
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
              Register
            </button>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-300 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
