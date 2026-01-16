import React, { useState } from 'react';
import { UserRole } from '../types';
import { ArrowLeft, Loader2, Store, Heart, Bike, ShieldCheck } from 'lucide-react';

interface AuthPageProps {
    selectedRole: UserRole;
    onLogin: () => void;
    onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ selectedRole, onLogin, onBack }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = async () => {
        setIsLoading(true);
        // We just toggle loading state here for UI feedback
        // The actual logic is passed via onLogin
        await onLogin();
        setIsLoading(false);
    };

    const getRoleDetails = () => {
        switch (selectedRole) {
            case UserRole.DONOR:
                return {
                    title: "Restaurant Partner",
                    subtitle: "Log in to manage surplus food and track your impact.",
                    icon: <Store className="w-12 h-12 text-black" />,
                    accentColor: "bg-primary text-black",
                    gradient: "from-primary/20",
                    buttonColor: "bg-primary hover:bg-primary-hover text-black"
                };
            case UserRole.RECIPIENT:
                return {
                    title: "NGO Partner",
                    subtitle: "Log in to find food for your community instantly.",
                    icon: <Heart className="w-12 h-12 text-black" />,
                    accentColor: "bg-secondary-accent text-black",
                    gradient: "from-secondary-accent/20",
                    buttonColor: "bg-secondary-accent hover:bg-amber-600 text-black"
                };
            case UserRole.RESCUER:
                return {
                    title: "Volunteer Hero",
                    subtitle: "Log in to start rescuing food and earning rewards.",
                    icon: <Bike className="w-12 h-12 text-white" />,
                    accentColor: "bg-tertiary-accent text-white",
                    gradient: "from-tertiary-accent/20",
                    buttonColor: "bg-tertiary-accent hover:bg-blue-600 text-white"
                };
            default:
                return {
                    title: "Welcome Back",
                    subtitle: "Log in to continue.",
                    icon: <ShieldCheck className="w-12 h-12 text-black" />,
                    accentColor: "bg-white text-black",
                    gradient: "from-white/20",
                    buttonColor: "bg-white hover:bg-gray-200 text-black"
                };
        }
    };

    const details = getRoleDetails();

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b ${details.gradient} to-transparent opacity-30 blur-[100px]`}></div>
                <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.05]"></div>
            </div>

            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group z-20"
            >
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-bold text-sm">Back</span>
            </button>

            {/* Main Card */}
            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">

                    {/* Icon Header */}
                    <div className="flex justify-center mb-8">
                        <div className={`w-24 h-24 rounded-2xl ${details.accentColor} flex items-center justify-center shadow-glow mb-4 rotate-3`}>
                            {details.icon}
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-3">{details.title}</h1>
                        <p className="text-gray-400 leading-relaxed font-light">{details.subtitle}</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleLoginClick}
                            disabled={isLoading}
                            className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 ${details.buttonColor} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fillOpacity="0.5" fill="#000000" /> {/* Modified for contrast based on background, simplifying for demo */}
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#18181b] px-2 text-gray-500">or</span>
                            </div>
                        </div>

                        <button
                            disabled
                            className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-not-allowed"
                        >
                            Log in with Email (Coming Soon)
                        </button>
                    </div>

                    <p className="mt-8 text-center text-xs text-gray-500">
                        By continuing, you agree to our <a href="#" className="underline hover:text-gray-300">Terms of Service</a> and <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
