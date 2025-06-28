import { useState } from 'react';
import { Eye, EyeOff, Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import SuccessPage from '../../components/common/SuccessPage';
import { useNavigate } from 'react-router-dom';



export default function AdminLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { handleAdminLogin } = useAdminAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
   
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
   
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const result = await handleAdminLogin(formData);
      
      if (result.success) {
        navigate('/success')
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(result.message);
        if (result.details && Array.isArray(result.details)) {
          const errors = {};
          result.details.forEach(detail => {
            if (detail.field) {
              errors[detail.field] = detail.message;
            }
          });
          setFieldErrors(errors);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Admin login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToUserLogin = () => {
    navigate('/auth')
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">SEA Admin</h1>
          <p className="text-blue-100/80">Sign in to access admin dashboard</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-100">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
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
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    fieldErrors.email 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-white/30 focus:border-blue-400'
                  } rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200`}
                  placeholder="admin@example.com"
                  disabled={isLoading}
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
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                    fieldErrors.password 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-white/30 focus:border-blue-400'
                  } rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-accent hover:text-blue-100 transition-colors"
                  disabled={isLoading}
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
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-center text-sm text-blue-200/80">
              Restricted access for authorized personnel only
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={navigateToUserLogin}
            className="text-blue-300 hover:text-blue-100 text-sm transition-colors underline"
          >
            ← Back to User Login
          </button>
        </div>
      </div>
    </div>
  );
}