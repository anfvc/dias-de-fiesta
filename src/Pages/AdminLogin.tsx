import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useTogglePassword } from "@/hooks/useTogglePassword";

type urlProp = {
  url: string;
};

type FormData = {
  email: string;
  password: string;
};

export default function AdminLogin({ url }: urlProp) {
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { type, visible, toggle } = useTogglePassword();

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please provide credentials!!!");
      return;
    }

    const response = await fetch(`${url}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // store JWT
      console.log(data.message);
      navigate("/admin/dashboard"); // redirect to dashboard
    } else {
      alert("Invalid login");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Backoffice</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-lg shadow-md w-xl border flex flex-col gap-4 items-center"
      >
        <h2 className="text-center text-3xl mb-3 font-semibold">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <div className="w-full flex items-center gap-3 relative">
          <input
            type={type}
            placeholder="Password"
            id="registerPassword"
            className="w-full p-2 mb-3 border rounded"
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
