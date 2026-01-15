import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmailAndPassword } from '../../services/authService';
import { UserRole } from '../../types';
import { Loader2, Store, Heart, Bike } from 'lucide-react';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.DONOR);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signUpWithEmailAndPassword(email, password, name, role);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
            setLoading(false);
        }
    };

    const RoleOption = ({ value, label, icon: Icon, description }: any) => (
        <div
            onClick={() => setRole(value)}
            className={`cursor-pointer p-4 rounded-xl border border-white/10 transition-all duration-300 relative group overflow-hidden ${role === value ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-white/5 hover:bg-white/10'}`}
        >
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${role === value ? 'bg-primary text-black' : 'bg-white/10 text-gray-400'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className={`font-bold ${role === value ? 'text-primary' : 'text-gray-200'}`}>{label}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4 py-8">
            <div className="w-full max-w-2xl bg-surface p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary-accent/10 rounded-full blur-[100px]"></div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:scale-105 transition-transform">
                            <img src="/logo.png" alt="FoodRescue" className="w-8 h-8" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">FoodRescue.ai</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-white mb-2">Join the Movement</h1>
                        <p className="text-gray-400 text-sm">Select your role and create an account</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">{error}</div>}

                        <div className="space-y-3">
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide">I want to...</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <RoleOption
                                    value={UserRole.DONOR}
                                    label="Donate"
                                    icon={Store}
                                    description="Restaurants & Hotels with surplus food."
                                />
                                <RoleOption
                                    value={UserRole.RECIPIENT}
                                    label="Receive"
                                    icon={Heart}
                                    description="NGOs & Shelters needing food."
                                />
                                <RoleOption
                                    value={UserRole.RESCUER}
                                    label="Volunteer"
                                    icon={Bike}
                                    description="Deliver food to help out."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Full Name / Org Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                                    placeholder="e.g. Saffron Banquet"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
