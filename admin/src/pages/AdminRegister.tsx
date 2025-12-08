import { useContext } from "react";
import { Link } from "react-router";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import { useCapsLockOnCheck } from "@/hooks/useCapsLockOnCheck";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import AdminContext from "@/context/AdminContext";
import logo from "@/assets/svg/logo2.svg";
import { ArrowBigUpDash } from "lucide-react";

export default function AdminRegister() {
  const { handleRegister, formData, setFormData, prefix } =
    useContext(AdminContext);

  const { type, visible, toggle, disabled } = useTogglePassword(
    formData.password || ""
  );

  const {isCapsLockActive, handleCapsLockCheck} = useCapsLockOnCheck()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="mb-10 w-1/4 max-w-full">
        <img
          src={logo}
          alt="Días de Fiesta - Wedding & Event Planner Logo"
          className="w-full h-auto"
        />
      </div>
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-lg shadow-xl w-xl flex flex-col gap-4 items-center"
      >
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Register
        </h2>
        <div className="w-full relative group">
          <input
            type="text"
            placeholder=" "
            className="w-full h-12 pt-10 pb-5 px-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none peer transition-all duration-150"
            value={formData.name}
            id="fullName"
            name="fullName"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label
            htmlFor="fullName"
            className="absolute top-1/2 left-3 text-gray-500 transform -translate-y-1/2 text-base transition-all duration-200 pointer-events-none
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600
              peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-lg peer-not-placeholder-shown:text-gray-500"
          >
            Name
          </label>
        </div>

        <div className="w-full relative group">
          <input
            type="email"
            placeholder=" "
            name="email"
            id="email"
            className="w-full h-12 pt-10 pb-5 px-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none peer transition-all duration-150"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label
            htmlFor="email"
            className="absolute top-1/2 left-3 text-gray-500 transform -translate-y-1/2 text-base transition-all duration-200 pointer-events-none
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600
              peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-lg peer-not-placeholder-shown:text-gray-500"
          >
            Email address
          </label>
        </div>
        <div className="w-full flex items-center relative">
          <input
            type={type}
            placeholder=" "
            name="register-password"
            id="register-password"
            onKeyDown={handleCapsLockCheck}
            onKeyUp={handleCapsLockCheck}
            className="w-full h-12 pt-10 pb-5 px-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none peer transition-all duration-150"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <label
            htmlFor="register-password"
            className="absolute top-1/2 left-3 text-gray-500 transform -translate-y-1/2 text-base transition-all duration-200 pointer-events-none
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600
              peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-lg peer-not-placeholder-shown:text-gray-500"
          >
            Password
          </label>
          <button
            type="button"
            onClick={toggle}
            disabled={disabled}
            aria-label={visible ? "Hide password" : "Show password"}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-500 transition-colors duration-200
              ${
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              }`}
          >
            {visible ? (
              <BsEyeSlash className="w-5 h-5" />
            ) : (
              <BsEye className="w-5 h-5" />
            )}
          </button>
        </div>
        {isCapsLockActive && (
            <div className="mt-2 p-3 bg-red-50 border border-red-300 rounded-lg flex justify-between items-center shadow-md animate-pulse">
              <ArrowBigUpDash className="w-8 h-8 text-red-600 shrink-0 mr-2" />
              <p className="text-lg font-semibold text-red-700">
                Caps Lock is ON. This may cause login failure.
              </p>
            </div>
          )}
        <button
          type="submit"
          className="w-full py-3 mt-2 font-semibold text-white rounded-lg shadow-lg
            bg-linear-to-r from-indigo-600 to-blue-500
            hover:from-indigo-700 hover:to-blue-600
            transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
        >
          Register
        </button>

        <p className="text-center text-lg text-gray-600 mt-2">
          Already have an account?{" "}
          <Link
            to={`${prefix}/login`}
            className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-150"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
