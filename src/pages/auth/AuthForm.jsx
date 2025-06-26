import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const { handleLogin, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setDetails([]);
    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
      ...(isLogin ? {} : { username: formData.name })
    };

    const res = isLogin
      ? await handleLogin(payload)
      : await handleRegister(payload);

    if (res.success) {
      if (isLogin) {
        navigate("/mealplans");
      } else {
        setIsLogin(true);
      }
    } else {
      setError(res.message);
      setDetails(res.details || []);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md w-full mx-auto glassmorphism p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-light">
        {isLogin ? "Welcome back!" : "Welcome to SEA Catering!"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
          {error}
          {details.length > 0 && (
            <ul className="mt-1 list-disc ml-5 text-xs">
              {details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-light">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border text-light rounded-lg outline-none bg-transparent glassmorphism"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-light">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg text-light glassmorphism outline-none bg-transparent"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg text-light glassmorphism outline-none bg-transparent"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full  text-white py-2 px-4 rounded-lg bg-indigo-600 hover:bg-accent transition disabled:opacity-50"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-light opacity-70">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-accent hover:underline font-medium ml-1"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
