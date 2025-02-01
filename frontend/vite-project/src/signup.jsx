import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const countryCodes = [
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
];

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setcontact] = useState("");
  const navigate = useNavigate();
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryListOpen(false);
  };
  const newUser = {
    name: name,
    password: password,
    username: username,
    contact: contact,
    email: email,
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3500/signup", newUser, {
        withCredentials: true,
      });
      if (res.status == 200) navigate("/login");
      setName("");
      setEmail("");
      setUsername("");
      setcontact("");
      setpassword("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create Account
          </h1>
          <form className="space-y-4">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                         peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 
                         peer-focus:text-blue-600 -translate-y-5 scale-75"
              >
                Name
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
                className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                         peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 
                         peer-focus:text-blue-600 -translate-y-5 scale-75"
              >
                Username
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                         peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 
                         peer-focus:text-blue-600 -translate-y-5 scale-75"
              >
                Email Address
              </label>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  onClick={() => setIsCountryListOpen(!isCountryListOpen)}
                >
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.code}</span>
                </button>
                {isCountryListOpen && (
                  <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {countryCodes.map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span>{country.flag}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {country.country}
                          </div>
                          <div className="text-xs text-gray-500">
                            {country.code}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 relative">
                <input
                  type="tel"
                  id="phone"
                  name="contact"
                  onChange={(e) => setcontact(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                           peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 
                           peer-focus:text-blue-600 -translate-y-5 scale-75"
                >
                  Phone Number
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
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

            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border rounded-lg peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                         peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 
                         peer-focus:text-blue-600 -translate-y-5 scale-75"
              >
                Confirm Password
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-blue-600 border rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="button"
              onClick={() => handleClick()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>
            <div className="text-center text-sm text-gray-600 mt-4">
              <Link to="/login" className="text-blue-600 hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
