import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGoogle, loginWithEmailAndPassword } from '../../services/authService';
import { UserRole } from '../../types';
import { Loader2 } from 'lucide-react';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await loginWithEmailAndPassword(email, password);
            // MainLayout or ProtectedRoute will handle redirect, but we can also push
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const user = await signInWithGoogle();
            if (user) navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px]"></div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:scale-105 transition-transform">
                            <img src="/logo.png" alt="FoodRescue" className="w-8 h-8" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">FoodRescue.ai</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Sign in to continue your impact journey</p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">{error}</div>}

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-3 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign In'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-gray-500 text-xs uppercase">Or continue with</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 group"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                        <span>Google</span>
                    </button>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
