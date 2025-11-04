import { useContext } from "react";
import { Link } from "react-router";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import AdminContext from "@/context/AdminContext";

export default function AdminRegister() {
  const { handleRegister, formData, setFormData } = useContext(AdminContext);

  const { type, visible, toggle, disabled } = useTogglePassword(
    formData.password || ""
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Backoffice</h1>
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-lg shadow-xl w-xl flex flex-col gap-4 items-center"
      >
        <h2 className="text-center text-3xl mb-3 font-semibold">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="w-full flex items-center relative">
          <input
            type={type}
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {!visible ? (
            <BsEye
              className={`absolute right-3 top-4 ${
                disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={toggle}
            />
          ) : (
            <BsEyeSlash
              className={`absolute right-3 top-4 ${
                disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={toggle}
            />
          )}
        </div>
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
