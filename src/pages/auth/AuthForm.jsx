/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import SuccessPage from "../../components/common/SuccessPage";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleLogin, handleRegister } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setDetails([]);
    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
      ...(isLogin ? {} : { username: formData.name }),
    };

    const res = isLogin ? await handleLogin(payload) : await handleRegister(payload);

    if (res.success) {
      if (isLogin) {
        setSuccess(true);
        navigate("/mealplans", { replace: true });
      } else {
        setIsLogin(true);
      }
    } else {
      setError(res.message);
      if (res.details && Array.isArray(res.details)) {
        const errors = {};
        res.details.forEach((detail) => {
          if (detail.field) {
            errors[detail.field] = detail.message;
          }
        });
        setFieldErrors(errors);
      }
    }

    setLoading(false);
  };

  if (success) return <SuccessPage />;

  return (
    <div>
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            SEA
          </h1>
          <p className="text-blue-100/80">
            {isLogin ? "Sign in to start exploring meal plans" : "Create your SEA account"}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-100">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      fieldErrors.username
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/30 focus:border-blue-400"
                    } rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200`}
                    placeholder="Your name"
                    disabled={loading}
                  />
                </div>
                {fieldErrors.username && (
                  <p className="text-red-300 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {fieldErrors.username}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    fieldErrors.email
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/30 focus:border-blue-400"
                  } rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200`}
                  placeholder="user@example.com"
                  disabled={loading}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-300 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                    fieldErrors.password
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/30 focus:border-blue-400"
                  } rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200`}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-accent hover:text-blue-100 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-300 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isLogin ? "Signing in..." : "Registering..."}</span>
                </div>
              ) : (
                isLogin ? "Sign In" : "Register"
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-300 hover:text-blue-100 text-sm transition-colors underline"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
