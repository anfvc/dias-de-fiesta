import { useContext } from "react";
import { Link } from "react-router";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import AdminContext from "@/context/AdminContext";

export default function AdminLogin() {
  const { data, setData, handleLogin } = useContext(AdminContext);
  const { type, visible, toggle } = useTogglePassword();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Backoffice</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-lg  shadow-xl w-xl  flex flex-col gap-4 items-center"
      >
        <h2 className="text-center text-3xl mb-3 font-semibold">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded outline-blue-600"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          autoFocus
        />
        <div className="w-full flex items-center gap-3 relative">
          <input
            type={type}
            placeholder="Password"
            id="registerPassword"
            className="w-full p-2 mb-3 border rounded outline-blue-600"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {!visible ? (
            <BsEye
              className="cursor-pointer absolute right-3 top-4"
              onClick={toggle}
            />
          ) : (
            <BsEyeSlash
              className="cursor-pointer absolute right-3 top-4"
              onClick={toggle}
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition-colors duration-100 mb-8 cursor-pointer"
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <span className="font-semibold">
            <Link to={"/admin/register"} className="font-bold text-blue-600">
              Register
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
