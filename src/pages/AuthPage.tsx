import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Google OAuth2 config – uses Authorization Code flow (no GIS library needed)
const GOOGLE_CLIENT_ID = "571057490382-334qvlsqsb4vi7n1ppbcssma075eeeiu.apps.googleusercontent.com";
const REDIRECT_URI = `${window.location.origin}/auth`;

function buildGoogleAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle the OAuth2 callback: extract ?code= from URL and exchange it
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (!code) return;

    setGoogleLoading(true);
    // Remove the ?code from URL immediately so refresh doesn't re-trigger
    window.history.replaceState({}, document.title, '/auth');

    api.post('/auth/google-callback', { code, redirect_uri: REDIRECT_URI })
      .then((res) => {
        localStorage.setItem('token', res.data.access_token);
        navigate('/dashboard');
      })
      .catch((err) => {
        setError(err.response?.data?.detail || 'Google Authentication failed. Please try again.');
        setGoogleLoading(false);
      });
  }, [location.search, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.access_token);
        navigate('/dashboard');
      } else {
        await api.post('/auth/register', { name, email, password });
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Authentication failed');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = buildGoogleAuthUrl();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {googleLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 z-10"
        >
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-lg font-semibold text-muted-foreground">Signing you in with Google...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-[2rem] border border-border bg-card/60 backdrop-blur-xl shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 mb-4"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h2 className="text-3xl font-bold text-center tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-muted-foreground mt-2 text-center text-sm">
              {isLogin ? 'Sign in to access your STEM dashboard' : 'Join thousands of students learning better'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-destructive text-sm mb-4 text-center bg-destructive/10 py-2 rounded-lg font-medium"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-muted-foreground overflow-hidden">
            <div className="h-px flex-1 bg-border/50"></div>
            <span className="text-xs font-semibold uppercase tracking-wider">or</span>
            <div className="h-px flex-1 bg-border/50"></div>
          </div>

          {/* Custom Google Sign-In Button — uses redirect flow, no GIS library */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="mt-6 w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-background/50 hover:bg-background/80 transition-all font-semibold text-sm shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </motion.button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-bold hover:underline underline-offset-4 decoration-2"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AuthPage;
