import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
          <form className="space-y-4">
            {/* Username/Email Input */}
            <div className="relative">
              <input
                type="text"
                id="usernameOrEmail"
                className="w-full px-4 py-2 border rounded-lg peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="usernameOrEmail"
                className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                         peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 
                         peer-focus:text-blue-600 -translate-y-5 scale-75"
              >
                Username or Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                         peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 
                         peer-focus:text-blue-600 -translate-y-5 scale-75"
              >
                Password
              </label>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 text-blue-600 border rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <Link to="/signup" className="text-blue-600 hover:underline">
                New here? Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
