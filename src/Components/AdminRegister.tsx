import { useState } from "react";
import { Link, useNavigate } from "react-router";

type urlProp = {
  url: string;
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function AdminRegister({ url }: urlProp) {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      alert("Please fill in all fields!");
      return;
    }

    const response = await fetch(`${url}/api/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Account created successfully. Please log in.");
      navigate("/admin/login");
    } else {
      const err = await response.json();
      alert(err.message || "Failed to register");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Backoffice</h1>
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-lg shadow-md w-xl border flex flex-col gap-4 items-center"
      >
        <h2 className="text-center text-3xl mb-3 font-semibold">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition-colors duration-100 mb-8 cursor-pointer"
        >
          Register
        </button>

        <p>
          Already have an account?{" "}
          <span className="font-semibold">
            <Link to="/admin/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
