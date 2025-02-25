import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../Redux/UserSlice";
import { toast } from "react-toastify";

const Header = () => {
  const data = useSelector((state) => {
    return state.UserReducer;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function logout() {
    // setLoader(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: "GET",
        credentials: "include", //cookie will go with req
      });
      const data = await res.text();
      dispatch(setUser(null));
      navigate("/login");

      toast(data);
    } catch (error) {
      toast(error.message);
    }
    setLoader(false);
  }

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white drop-shadow-md">
          🔥 To-Do App
        </h1>
        <div className="space-x-6 text-lg">
          {!data.user && (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-gray-200 transition"
              >
                Register
              </Link>
            </>
          )}
          {data.user && (
            <>
              <Link
                to="/tasks"
                className="text-white hover:text-gray-200 transition"
              >
                Tasks
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-gray-200 transition"
              >
                logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
