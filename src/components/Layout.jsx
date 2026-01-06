import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Rocket, BookOpen } from 'lucide-react';

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            TeenBiz Builder
                        </span>
                    </Link>
                    <nav className="flex gap-4">
                        <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            Guide
                        </a>
                        <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            About
                        </a>
                    </nav>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} TeenBiz Builder. Empowering young entrepreneurs in KL.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
